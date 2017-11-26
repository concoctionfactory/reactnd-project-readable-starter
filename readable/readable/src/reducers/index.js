import { combineReducers } from 'redux'
import * as API from '../utils/api'
import {addPostComment} from '../actions'

import{
    ADD_CATEGORY,

    ADD_POST,
    REMOVE_POST,
    UPDATE_POST,
    UPDATE_POST_SCORE,

    INIT_COMMENT,
    ADD_POST_COMMENT,
    REMOVE_COMMENT,
    UPDATE_COMMENT_SCORE,
    UPDATE_COMMENT,

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
    const{category}=action
    switch(action.type){
        case ADD_CATEGORY:
            return{
                ...state,
                [action.category.name]:action.category
            }
        default:
            return state;
    }
}


function posts(state={},action){
    const{post, id, title, parentId} =action
    switch(action.type){
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
                    ...state[id],
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
                    ...state[id],
                    voteScore: (action.isScoreUp=="true"?(state[id].voteScore+1):(state[id].voteScore-1))
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
    const{comment, id, title, parentId} =action
    switch(action.type){
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
                    ...state[id],
                    voteScore: (action.isScoreUp=="true"?(state[id].voteScore+1):(state[id].voteScore-1))
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