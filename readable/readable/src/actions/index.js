import * as API from '../utils/api'

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

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'


export function fetchCategories () {
    return dispatch => {
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

  
export function fetchPosts () {
    return dispatch => {
        API.getPosts() 
       .then(function(json){
            dispatch(recievePosts(json));
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


export function fetchComments (postId) {
    return dispatch => {
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




export function reqAddPost ({post}) {
    return (dispatch) => {
        API.addPost(post)
        .then(() =>dispatch(addPost({post})))
    }
}
export function addPost ({post}){
    return{
        type: ADD_POST,
        post
    }
}


export function reqRemovePost ({id}) {
    return (dispatch) => {
        API.deletePost(id)
        .then(() =>dispatch(removePost({id})))
    }
}
export function removePost({id}){
    return{
        type:REMOVE_POST,
        id
    }
}


export function reqUpdatePost ({id,post}) {
    return (dispatch) => {
        API.updatePost(id, post)
        .then(() =>dispatch(updatePost({id,post})))
    }
}
export function updatePost ({id,post}){
    return{
        type: UPDATE_POST,
        id,
        post
    }
}


export function reqUpdatePostScore ({id,isScoreUp}) {
    return (dispatch) => {
        API.updatePostScore(id, isScoreUp)
        .then(() =>dispatch(updatePostScore({id,isScoreUp})))
    }
}
export function updatePostScore({id, isScoreUp}){
    return{
        type: UPDATE_POST_SCORE,
        id,
        isScoreUp
    }
}







export function reqAddPostComment  ({parentId,comment}) {
    return (dispatch) => {
        API.addComment(comment)
        .then(() =>dispatch(addPostComment({parentId,comment})))
    }
}
export function addPostComment  ({parentId,comment}){
    return{
        type: ADD_POST_COMMENT,
        parentId: comment.parentId,
        comment
    }
}


export function reqRemoveComment  ({id,comment}) {
    return (dispatch) => {
        API.deleteComment(id,comment)
        .then(() =>dispatch(removeComment({id,comment})))
    }
}
export function removeComment({id, comment}){
    return{
        type:REMOVE_COMMENT,
        id,
        comment
    }
}


export function reqUpdateComment ({id,comment}) {
    return (dispatch) => {
        API.updateComment(id, comment)
        .then(() =>dispatch(updateComment({id,comment})))
    }
}
export function updateComment ({id,comment}){
    return{
        type: UPDATE_COMMENT,
        id,
        comment
    }
}


export function reqUpdateCommentScore ({id,isScoreUp}) {
    return (dispatch) => {
        API.updateCommentScore(id, isScoreUp)
        .then(() =>dispatch(updateCommentScore({id,isScoreUp})))
    }
}
export function updateCommentScore({id, isScoreUp}){
    return{
        type: UPDATE_COMMENT_SCORE,
        id,
        isScoreUp
    }
}


