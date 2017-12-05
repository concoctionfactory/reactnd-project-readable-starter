
const api = "http://localhost:3001"
// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}
  

export function getCategories () {
    return fetch(`${api}/categories/`,{
    method:'GET',
    headers:{ ...headers }})
    .then(data => data.json())
    .then(data => data.categories)
}

export function getPosts (){
  return fetch(`${api}/posts/`,{
    method:'GET',
    headers:{...headers}})
    .then(res => res.json())
}


export function getCommments (postId){
  return fetch(`${api}/posts/${postId}/comments/`,{
    method:'GET',
    headers: {...headers}})
    .then(res => res.json())
}


export function addPost(post){
  fetch(`${api}/posts/`,{
    method:'POST',
    headers:{...headers,'Content-Type':  'application/json'},
    body: JSON.stringify( post )
  })
}

export function updatePostScore(postId, isUpvote){
  var voteStr =(isUpvote==="true")? "upVote" : "downVote"
  fetch(`${api}/posts/${postId}/`,{
    method:'POST',
    headers:{...headers, 'Content-Type': 'application/json'},
    body: JSON.stringify( {option :voteStr} )
  })
}


export function updatePost(postId, post){
  fetch(`${api}/posts/${postId}/`,{
    method:'PUT',
    headers:{...headers,'Content-Type':  'application/json'},
    body: JSON.stringify( post )
  })
}

export function deletePost(postId){
  fetch(`${api}/posts/${postId}/`,{
    method:'DELETE',
    headers:{...headers},
  })
}




export function addComment(comment){
  console.log(comment);
  fetch(`${api}/comments/`,{
    method:'POST',
    headers:{...headers,'Content-Type':  'application/json'},
    body: JSON.stringify( comment )
  })
}

export function updateCommentScore(commentId, isUpvote){
  var voteStr = (isUpvote==="true")? "upVote" : "downVote"
  fetch(`${api}/comments/${commentId}/`,{
    method:'POST',
    headers:{...headers, 'Content-Type': 'application/json'},
    body: JSON.stringify( {option :voteStr} )
  })
}

export function updateComment(commentId, comment){
  fetch(`${api}/comments/${commentId}/`,{
    method:'PUT',
    headers:{...headers,'Content-Type':  'application/json'},
    body: JSON.stringify( comment )
  })
}

export function deleteComment(commentId){
  fetch(`${api}/comments/${commentId}/`,{
    method:'DELETE',
    headers:{...headers},
  })
}