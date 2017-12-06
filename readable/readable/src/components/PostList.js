import React, {Component} from 'react'
import { connect } from 'react-redux';
import CommentList from './CommentList'
import VoteScore from './VoteScore'
import {Link} from 'react-router-dom'
import {reqRemovePost,reqUpdatePostScore,openCreateEdit} from '../actions'


const VOTE ="voteScore";
const TIME = "timestamp";
class PostList extends Component{
    state ={
        sortBy:VOTE
    }

    openModal= function(dataType,data, mode,parentId){
       this.props.dispatch(openCreateEdit({dataType,data, mode,parentId}))
    }

    sortByChange = function(e){
        var temp =e.target.value;
        this.setState((state)=>({
            sortBy:temp
        }))
    }

    sortPosts= function(postsArray){
        const {sortBy}= this.state;
        var sortedPost =postsArray.sort((a,b)=>(b.post[sortBy]- a.post[sortBy]))
            return(sortedPost)
    }

    remove= function(e){
        var id =e.target.value;
        this.props.dispatch(reqRemovePost({id}))
    }


    render(){
        console.log(this.props);
        const {posts} = this.props;
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
                        <li key={postItem.post.id}>
                        {/* //    {this.props.dispatch(fetchComments(postItem.post.id))} */}
                            <div className="header">
                        <Link to={ `/${postItem.post.category}/${postItem.post.id}`}>
                            
                                <h3 className="title">{postItem.post.title}</h3>
                            </Link>   
                                
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
                                <VoteScore id = {postItem.post.id} score={postItem.post.voteScore} action={reqUpdatePostScore} />

                                <div className="comment-info">
                                    <span>{postItem.post.commentCount} comments</span>
                                    <button onClick={(e)=>this.openModal("comment", null, "add", postItem.post.id) }>add</button>
                                </div>

                            </div>

                        <hr/>
                            
                            <CommentList parentId= {postItem.post.id} comments= {postItem.comments}/>
    
                        </li>
                    ))}
                </ul>
                    
            </div>
        )//return
    }//render
}//class





export default connect() (PostList)