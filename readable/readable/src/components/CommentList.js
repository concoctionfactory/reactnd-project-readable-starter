import React, {Component} from 'react'
import { connect } from 'react-redux';

import VoteScore from './VoteScore'

import {removeComment, updateCommentScore,openCreateEdit} from '../actions'
const TIME = "timestamp";


class CommentList extends Component{
    remove= function(comment){
        var id =comment.id;
        this.props.dispatch(removeComment({id, comment}))
    }
    openModal= function(dataType,data, mode,parentId){
       this.props.dispatch(openCreateEdit({dataType,data, mode,parentId}))
    }

    render(){
    const {comments} = this.props;
        return (
            <div>
                <ul className ='comment-list'>
                    {comments.sort((a,b)=>(b[TIME]- a[TIME])).map((comment)=>(
                        <li key={comment.id}>
                            <div className="header-info">
                                <span className="author">{comment.author}</span>
                                <span className="time">{(new Date(comment.timestamp)).toDateString()}</span>
                            </div>
                            <p>{comment.body}</p>

                            <div className="action">
                                <button onClick={(e)=>this.openModal("comment", comment, "update", "")}>edit</button>
                                <button onClick={(e)=>this.remove(comment)} value={comment.id}>delete</button>
                            </div>

                            <div className="footer">
                            <VoteScore id = {comment.id} score={comment.voteScore} action={updateCommentScore} />
                            </div>

                            <hr/>

                        </li>
                        
                    ))}
                </ul>

            </div>
        )
    }
}

export default connect() (CommentList)