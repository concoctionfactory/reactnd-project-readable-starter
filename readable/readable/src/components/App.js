import React, { Component } from 'react';
import{ connect} from 'react-redux'
import * as API from '../utils/api'

import CategoryList from './CategoryList'
import PostList from './PostList'
import CreateFromModal from './CreateFormModal'
import {fetchCategories,fetchPosts} from '../actions'

class App extends Component {

  componentDidMount() {
   this.props.dispatch(fetchCategories());
   this.props.dispatch(fetchPosts());
  }


  render() {
    const {categoryArray,postArray,createEditModal}= this.props
    
    var categoryFilter =this.props.match.params.category;
    var idFilter =this.props.match.params.post_id;
    var isIdValid =  postArray.filter((postItem)=>(postItem.post.id === idFilter)).length>0
    
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
        />

        {isIdValid&&(
          <PostList
            posts={postArray.filter((postItem)=>(postItem.post.id === idFilter))}
          />  
        )}

        {idFilter&&!isIdValid&&(
          <div>nothing found</div>
        )}

        {!idFilter&&(
          <PostList
            posts={categoryFilter ? postArray.filter((postItem)=>(postItem.post.category === categoryFilter)): postArray}
          />  
        )}
 
      </div>
    );
  }//render
}//app


function mapStateToProps ({categories, posts, comments, createEdit }) {
  return {
      categoryArray: Object.values(categories).map((category)=>(
        category.name
      )),
      
      postArray: Object.values(posts).filter(post=>(post.deleted===false)).map((post)=>({
        post: post,
        comments: Object.values(comments).filter(comment=>comment.parentId===post.id).filter(comment=>(comment.deleted===false))
      })),

      createEditModal: createEdit
    }
}




export default connect(mapStateToProps)(App);