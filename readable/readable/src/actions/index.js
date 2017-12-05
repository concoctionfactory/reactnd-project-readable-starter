import * as API from '../utils/api'
export const ADD_CATEGORY ='ADD_CATEGORY'

export const ADD_POST ='ADD_POST'
export const REMOVE_POST='REMOVE_POST'
export const UPDATE_POST ='UPDATE_POST'
export const UPDATE_POST_SCORE ='UPDATE_POST_SCORE'

export const INIT_COMMENT ='INIT_COMMENT'
export const ADD_POST_COMMENT ='ADD_POST_COMMENT'

export const REMOVE_COMMENT ='REMOVE_COMMENT'
export const UPDATE_COMMENT ='UPDATE_COMMENT'
export const UPDATE_COMMENT_SCORE ='UPDATE_COMMENT_SCORE'

export const OPEN_CREATE_EDIT ='OPEN_CREATE_EDIT'
export const CLOSE_CREATE_EDIT ='CLOSE_CREATE_EDIT'

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'


function requestCategories() {
  return {
    type: REQUEST_CATEGORIES
  }
}


export function fetchCategories () {
    return dispatch => {
        dispatch(requestCategories())
        API.getCategories() 
        .then(json =>dispatch(recieveCatergories(json)))
    }
}


export function recieveCatergories(json){
    return{
        type:RECEIVE_CATEGORIES,
        json
    }
}






function requestPosts() {
    return {
      type: REQUEST_POSTS
    }
  }
  
export function fetchPosts () {
    return dispatch => {
        dispatch(requestPosts())
        API.getPosts() 
       // .then(json =>dispatch(recievePosts(json)))
       .then(function(json){
            dispatch(recievePosts(json));
            console.log(json);
            json.forEach(post=>dispatch(fetchComments(post.id)))
       })
    }
}

export function recievePosts(json){
    return{
        type:RECEIVE_POSTS,
        json
    }
}


export const REQUEST_COMMENTS= 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'


function requestComments() {
    return {
      type: REQUEST_COMMENTS
    }
  }
  
export function fetchComments (postId) {
    return dispatch => {
        dispatch(requestComments())
        API.getCommments(postId) 
        .then(json =>dispatch(recieveComments(json)))
    }
}

export function recieveComments(json){
    return{
        type:RECEIVE_COMMENTS,
        json
    }
}



export function openCreateEdit({ dataType, data, mode, parentId}){
    return{
        type:OPEN_CREATE_EDIT,
        dataType,
        data,
        mode,
        parentId
    }
}

export function closeCreateEdit(){
    return{
        type:CLOSE_CREATE_EDIT
    }
}

export function addCategory({category}){
    return{
        type: ADD_CATEGORY,
        category
    }
}




export function addPost ({post}){
    return{
        type: ADD_POST,
        post
    }
}

export function removePost({id}){
    return{
        type:REMOVE_POST,
        id
    }
}

export function updatePost ({id,post}){
    return{
        type: UPDATE_POST,
        id,
        post
    }
}

export function updatePostScore({id, isScoreUp}){
    return{
        type: UPDATE_POST_SCORE,
        id,
        isScoreUp
    }
}




export function addPostComment  ({parentId,comment}){
    return{
        type: ADD_POST_COMMENT,
        parentId: comment.parentId,
        comment
    }
}

export function initComment ({parentId,comment}){
    return{
        type: INIT_COMMENT,
        parentId: comment.parentId,
        comment
    }
}

export function removeComment({id, comment}){
    return{
        type:REMOVE_COMMENT,
        id,
        comment
    }
}

export function updateComment ({id,comment}){
    return{
        type: UPDATE_COMMENT,
        id,
        comment
    }
}

export function updateCommentScore({id, isScoreUp}){
    return{
        type: UPDATE_COMMENT_SCORE,
        id,
        isScoreUp
    }
}


