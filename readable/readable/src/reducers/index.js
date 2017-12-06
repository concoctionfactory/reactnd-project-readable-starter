import { combineReducers } from 'redux'

import{
    RECEIVE_CATEGORIES,

    ADD_POST,
    REMOVE_POST,
    UPDATE_POST,
    UPDATE_POST_SCORE,
    RECEIVE_POSTS,

    ADD_POST_COMMENT,
    REMOVE_COMMENT,
    UPDATE_COMMENT_SCORE,
    UPDATE_COMMENT,
    RECEIVE_COMMENTS,

    OPEN_CREATE_EDIT,
    CLOSE_CREATE_EDIT
}from '../actions'



const initialCategories={
    all:{
        name:"all",
        path:"all"
    }
}

const initalCreateEdit={
    isOpen: false,
    dataType:"",
    data:{},
    mode:"",
    parentId:""
}

function createEdit(state= initalCreateEdit, action){
    switch (action.type){
        case OPEN_CREATE_EDIT:
            return{
                ...state,
                isOpen: true,
                dataType: action.dataType,
                data: action.data,
                mode: action.mode,
                parentId: action.parentId
            }
        case CLOSE_CREATE_EDIT:
            return{
                ...state,
                isOpen: false,
                dataType: null,
                data: null,
                mode: null,
                parentId: null
            }
        default:
            return state;
    }
}


function categories(state=initialCategories, action){
    switch(action.type){
        case RECEIVE_CATEGORIES:
            var categoryObjArray= action.json.reduce((obj, item) => {
                obj[item.name] = item
                return obj
            }, {})
            return{
                ...state,...categoryObjArray ,
            }
        default:
            return state;
    }
}


function posts(state={},action){
    switch(action.type){
        case RECEIVE_POSTS:
            var posts= action.json.reduce((obj, item) => {
                obj[item.id] = item
                return obj
            }, {})
            return{
                ...posts
            }


        case ADD_POST:
            return{
                ...state,
               [action.post.id]:action.post,
            }

        case REMOVE_POST:     
            return{
                ...state,
                [action.id]:{
                    ...state[action.id],
                    deleted: "true"
                }
        }

        case UPDATE_POST:
            return{
                ...state,
                [action.id]:action.post,
            }

        case UPDATE_POST_SCORE:
            return{
                ...state,
                [action.id]:{
                    ...state[action.id],
                    voteScore: (action.isScoreUp==="true"?(state[action.id].voteScore+1):(state[action.id].voteScore-1))
                }
            }

        case ADD_POST_COMMENT:
            return{
                ...state,
                [action.comment.parentId]:{
                    ...state[action.comment.parentId],
                    commentCount: state[action.comment.parentId].commentCount+1
                }
            }

        case REMOVE_COMMENT:
            return{
                ...state,
                [action.comment.parentId]:{
                    ...state[action.comment.parentId],
                    commentCount: state[action.comment.parentId].commentCount-1
                }
            }

        default:
            return state;
    }
}//post


function comments(state={}, action){
    switch(action.type){
        case RECEIVE_COMMENTS:
            var commentObjArray= action.json.reduce((obj, item) => {
                obj[item.id] = item
                return obj
            }, {})
            return{
                ...state,...commentObjArray ,
            }

        case ADD_POST_COMMENT:
            return{
                ...state,
                    [action.comment.id]:action.comment,
                }
        case REMOVE_COMMENT:
            return{
                ...state,
                [action.id]:{
                    ...state[action.id],
                    deleted: "true"
                }
            }
        case UPDATE_COMMENT:
            return{
                ...state,
                [action.id]:action.comment,
            }

        case UPDATE_COMMENT_SCORE:
            return{
                ...state,
                [action.id]:{
                    ...state[action.id],
                    voteScore: (action.isScoreUp==="true"?(state[action.id].voteScore+1):(state[action.id].voteScore-1))
                }
            }
        default:
            return state;
    }
}//comment

export default combineReducers({
    categories,
    posts,
    comments,
    createEdit
})