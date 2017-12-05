import React, { Component } from 'react';
import{ connect} from 'react-redux'
import Modal from 'react-modal'
import {addPost, updatePost,addPostComment,updateComment, closeCreateEdit} from '../actions'


class CreateFormModal extends Component {
    state={
        titleVal:this.props.data?this.props.data.title: "",
        bodyVal:this.props.data?this.props.data.body: "",
        authorVal:this.props.data?this.props.data.author: "",
        categoryVal:this.props.data?this.props.data.category: ""
    }

    done = function(e){
        console.log(this.state);
        var obj ={
            id:this.props.data?this.props.data.id: this.uuid(),
            timestamp:this.props.data?this.props.data.timestamp: Date.now(),
            body:this.state.bodyVal||"default body",
            author:this.state.authorVal||"default author",
            voteScore:this.props.data?this.props.data.voteScore: 1,
            deleted:this.props.data?this.props.data.deleted: false,
        }

        var post={
            title:this.state.titleVal||"default title",
            category:this.state.categoryVal||"react",
            commentCount:this.props.data?this.props.data.commentCount: 0,
        }

        var comment={
            parentId: this.props.data?this.props.data.parentId: this.props.parentId,
            parentDeleted: this.props.data?this.props.data.parentDeleted: false,
        }

        post = {...obj,...post}
        comment ={...obj,...comment}


        if (this.props.dataType==="post"){
            if(this.props.mode==="add"){
                this.props.dispatch(addPost({post}));
            }
            else{// "update":
                var id =post.id
                this.props.dispatch(updatePost({id, post}));
            }
        }
        
        else{//assume comment
            if(this.props.mode==="add"){
                this.props.dispatch(addPostComment({comment}));
            }
            else{// "update":
                var tempId =comment.id
                this.props.dispatch(updateComment({tempId, comment}));
            }
        }
           
        this.props.dispatch(closeCreateEdit())
    }


    cancel= function(){
        this.props.dispatch(closeCreateEdit())
    }


    //https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
     uuid=function() {
        return 'xxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
      

   valChange=function(e){
       console.log(e.target);
        var dataState =e.target.getAttribute('data-state')
        var val = e.target.value
        this.setState((state)=>({
            [dataState]:val
        }))
    }

    reset= function(e){
        console.log("reset",this)
        this.setState(state=>({
            titleVal:this.props.data?this.props.data.title: "",
            bodyVal:this.props.data?this.props.data.body: "",
            authorVal:this.props.data?this.props.data.author: "",
            categoryVal:this.props.data?this.props.data.category: ""
        }))
    }

    render() {
        return(
            <Modal
                className='modal'
                overlayClassName='overlay'
                isOpen={this.props.isOpen}
                contentLabel='Modal'
                onAfterOpen = {(e)=>this.reset(e)}
            >

            {this.props.dataType==="post"&&(
                <div>            
                    <label>title</label>
                    <input
                        className='title-input'
                        type='text'
                        placeholder='title'
                        value={this.state.titleVal} data-state={"titleVal"} onChange={(e)=>this.valChange(e)}
                    ></input>
                </div>
            )}

            <label>body</label>
            <textarea
                className='body-input'
                type='text'
                placeholder='body'
                ref={(input) => this.input = input}
                value={this.state.bodyVal} data-state={"bodyVal"} onChange={(e)=>this.valChange(e)}
            ></textarea>

            <label>author</label>
            <input
                className='author-input'
                type='text'
                placeholder='author'
                ref={(input) => this.input = input}
                value={this.state.authorVal} data-state={"authorVal"} onChange={(e)=>this.valChange(e)}
            ></input>

            {this.props.dataType==="post"&&(
                <div>
                    <label>category</label>
                    <select value={this.state.categoryVal} data-state={"categoryVal"} onChange={(e)=>this.valChange(e)} >
                        {this.props.categoryArray.map((category)=>(
                            <option value={category} key={category}>{category}</option>
                        ))}
                        </select>
                </div>
            )}

            <div className= "action">
                <button onClick={(e)=>this.done(e)}>{this.props.mode}</button>
                <button onClick={(e)=>this.cancel(e)}>cancel</button>
            </div>

            </Modal>
        )
    }
}

function mapStateToProps ({categories }) {
    return {
        categoryArray: Object.values(categories).map((category)=>(
        category.name
        )).filter(category=>(category !=="all"))
    }
}
export default connect(mapStateToProps) (CreateFormModal)