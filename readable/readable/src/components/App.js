import React, { Component } from 'react';
import{ connect} from 'react-redux'

import * as API from '../utils/api'

import CategoryList from './CategoryList'
import PostList from './PostList'
import CreateFromModal from './CreateFormModal'
import {addPost, initComment, addCategory} from '../actions'

class App extends Component {
  state={
    currentCategory:null,
  }


  componentDidMount() {
    const self = this
    API.getPosts()
      //.then((posts) =>console.log(posts))
      .then((posts) => posts.forEach(function(post){
        self.props.createPost({post});
        //if(post.commentCount>0){
          API.getCommments(post.id)
        // .then((comments)=>console.log("comments",comments))
        .then((comments)=> comments.forEach((comment)=>(self.props.createComment({comment}))))
       // }
      }))
      
    API.getCategories()
    .then((categories) => categories.forEach(function(category){
      self.props.createCategory({category});
    }))
  }

  categorySelect=(category) =>{
    this.setState((state)=>({
      currentCategory: category
    }))
  }


  postSelect=(id)=>{
    API.getCommments(id)
    .then((comment)=>this.setState(()=>({
      comment
    })))
  }

  render() {
    const { currentCategory}= this.state
    const {categoryArray,postArray,createEditModal}= this.props
    
    // console.log(this.state);
    // console.log(this.props);
    
    return (
      <div className="App">
      <CreateFromModal
        isOpen ={createEditModal.isOpen}
        dataType={createEditModal.dataType}
        data={createEditModal.data}
        mode={createEditModal.mode}
        parentId={createEditModal.parentId}
      />
        <CategoryList
          categories={categoryArray}
          categorySelect ={this.categorySelect}
        />
        <PostList
          posts={(currentCategory==null||currentCategory=="all")?postArray :postArray.filter((postItem)=>(postItem.post.category == currentCategory))}
          postSelect={this.postSelect}
        />
      </div>
    );
  }
}


function mapStateToProps ({categories, posts, comments, createEdit }) {
  console.log(createEdit) 
  return {
      categoryArray: Object.values(categories).map((category)=>(
        category.name
      )),
      
      postArray: Object.values(posts).filter(post=>(post.deleted==false)).map((post)=>({
        post: post,
        comments: Object.values(comments).filter(comment=>comment.parentId==post.id).filter(comment=>(comment.deleted==false))
      })),

      createEditModal: createEdit
    }
}



function mapDispatchToProps(dispatch){
  return{
    createCategory:(data)=>dispatch(addCategory(data)),
    createPost: (data)=> dispatch(addPost(data)),
    createComment: (data)=>dispatch(initComment(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);