import { combineReducers } from 'redux'
import * as API from '../utils/api'

import{
    ADD_CATEGORY,
    REQUEST_CATEGORIES,
    RECEIVE_CATEGORIES,

    ADD_POST,
    REMOVE_POST,
    UPDATE_POST,
    UPDATE_POST_SCORE,
    REQUEST_POSTS,
    RECEIVE_POSTS,

    INIT_COMMENT,
    ADD_POST_COMMENT,
    REMOVE_COMMENT,
    UPDATE_COMMENT_SCORE,
    UPDATE_COMMENT,

    REQUEST_COMMENTS,
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
        case ADD_CATEGORY:
            return{
                ...state,
                [action.category.name]:action.category
            }
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
            API.addPost(action.post);
            return{
                ...state,
               [action.post.id]:action.post,
            }

        case REMOVE_POST:     
            API.deletePost(action.id);
            return{
                ...state,
                [action.id]:{
                    ...state[action.id],
                    deleted: "true"
                }
        }

        case UPDATE_POST:
            API.updatePost(action.id, action.post);
            return{
                ...state,
                [action.id]:action.post,
            }

        case UPDATE_POST_SCORE:
            API.updatePostScore(action.id,action.isScoreUp);
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
            console.log(commentObjArray);
            return{
                ...state,...commentObjArray ,
            }


        case INIT_COMMENT:
            API.addComment(action.comment);
            return{
                ...state,
                    [action.comment.id]:action.comment,
                }
        case ADD_POST_COMMENT:
            API.addComment(action.comment);
            return{
                ...state,
                    [action.comment.id]:action.comment,
                }
        case REMOVE_COMMENT:
            API.deleteComment(action.id, action.comment);
            return{
                ...state,
                [action.id]:{
                    ...state[action.id],
                    deleted: "true"
                }
            }
        case UPDATE_COMMENT:
            API.updateComment(action.id, action.comment);
            return{
                ...state,
                [action.id]:action.comment,
            }

        case UPDATE_COMMENT_SCORE:
            API.updateCommentScore(action.id,action.isScoreUp);
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