import React, {Component} from 'react'
import { connect } from 'react-redux';

import CommentList from './CommentList'
import VoteScore from './VoteScore'
// import CreateForm from './CreateForm'

import {removePost,updatePostScore,openCreateEdit} from '../actions'


const VOTE ="voteScore";
const TIME = "timestamp";
class PostList extends Component{

    state ={
        sortBy:VOTE
    }
    openModal= function(dataType,data, mode,parentId){
        console.log(data);
       this.props.dispatch(openCreateEdit({dataType,data, mode,parentId}))
    }

    sortByChange = function(e){
        // console.log(e.target.value);
        var temp =e.target.value;
        this.setState((state)=>({
            sortBy:temp
        }))
        // console.log(this.state);
        // console.log()
    }
    sortPosts= function(postsArray){
        const {sortBy}= this.state;
        var sortedPost
        switch(this.state.sortBy){
            case VOTE:
                sortedPost =postsArray.sort((a,b)=>(b.post[sortBy]- a.post[sortBy]))
                // console.log("vote",sortedPost);
                return(
                    sortedPost
                )
            case TIME:
                sortedPost =postsArray.sort((a,b)=>(a.post[sortBy]- b.post[sortBy]))
                // console.log("time",sortedPost);
                
                return(
                    sortedPost
                )
        }
    }

    remove= function(e){
        var id =e.target.value;
        this.props.dispatch(removePost({id}))
    }

    render(){
    const {posts,postSelect} = this.props;
    return (
        <div>

            <div className="sort-by">
                <span>sortby:</span>
                <button onClick={(e)=>this.sortByChange(e) } value={VOTE}>vote score</button>
                <button onClick={(e)=>this.sortByChange(e) } value={TIME}>time stamp </button>
            </div>

            <div className="add-post">
                <button onClick={(e)=>this.openModal("post", null, "add", "") }>add post</button>
            </div>


            <ul className ='post-list'>
                {this.sortPosts(posts).map((postItem)=>(
                    <li onClick={()=>postSelect(postItem.post.id)} key={postItem.post.id}>
                        <div className="header">
                            <h3 className="title">{postItem.post.title}</h3>
                            <div className="header-info">
                                <span className="author">{postItem.post.author}</span>
                                <span className="time">{(new Date(postItem.post.timestamp)).toDateString()}</span>
                            </div>
                        </div>
                        <p>{postItem.post.body}</p>

                        <div className="action">
                            <button onClick={(e)=>this.openModal("post", postItem.post, "update", "")}>edit</button>
                            <button onClick={(e)=>this.remove(e)} value={postItem.post.id}>delete</button>
                        </div>

                        <div className="footer">
                            <VoteScore id = {postItem.post.id} score={postItem.post.voteScore} action={updatePostScore} />

                            {/* <h5>{post.category}</h5> */}
                            <div className="comment-info">
                                <span>{postItem.post.commentCount} comments</span>
                                <button onClick={(e)=>this.openModal("comment", null, "add", postItem.post.id) }>add</button>
                            </div>

                        </div>

                       <hr/>
                        
                        <CommentList parentId= {postItem.post.id} comments= {postItem.comments}/>
                {/* <CreateForm type={"post"} data={post} mode={"update"}/> */}
                        
                    </li>
                ))}
            </ul>
                {/* <CreateForm type={"post"} mode={"add"}/> */}
                
        </div>
    )
    }
}

export default connect() (PostList)