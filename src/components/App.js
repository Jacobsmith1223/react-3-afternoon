import React, { Component } from 'react';
import axios from 'axios'

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };
    this.baseURL = 'https://practiceapi.devmountain.com/api'
    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    const promise = axios.get(`${this.baseURL}/posts`);

    promise.then((response)=>{
      this.setState({
        posts:response.data
      })
    })
  }

  updatePost(id,text) {
  const promise = axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`,{text})
  promise.then((response) => {
    console.log('hit')
    this.setState({posts: response.data})
  })
  promise.catch((error)=>{
    console.log(error)
  })
  }

  deletePost(id) {
    const promise = axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${ id }`)
    promise.then((response) => {
      this.setState({posts: response.data})
    })
  }

  createPost(text) {
    const promise = axios.post('https://practiceapi.devmountain.com/api/posts', {text})
    promise.then((response) => {
      this.setState({posts:response.data})
    })

  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          {posts.map( post => (
            <Post key={post.id} 
            text={post.text} 
            date={post.date} 
            id={post.id} 
            updatePostFn={this.updatePost}
            deletePostFn={this.deletePost} />
          ))}
         
        </section>
      </div>
    );
  }
}

export default App;
