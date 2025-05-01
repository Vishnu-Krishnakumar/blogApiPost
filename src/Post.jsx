import { useEffect, useState } from "react";
import {getComments,postComments} from "./serverUtils/server"
import Comment from "./Comment";
import { data } from "react-router-dom";
function Post({title,content,published,id,setHover,hover,user}) {
  const [comments,setComments] = useState([])

  async function data(){
    const current = await getComments(id)
    setComments(current);
  }

  async function permaHover(){
    if(hover === id) setHover(-1);
    else{ 
      setHover(id);
      await data()
    }
  }

  async function refresh(){;
 
  }
  async function submit(e){
    console.log(e);
    console.log(e.formData);
    await postComments(e);
    await data();
  }
  useEffect(()=>{
    if(hover !== id){
      setComments([]);
    }
  },[hover])

  // useEffect(()=>{

  // },[comments])

  return (
    <div id = "postCard" className = {hover === id ?'permaCard':'card'}  >
      <h3 onClick ={permaHover} >{title}</h3>
      {hover === id &&<li>{content}</li>}
      {comments.map((comment)=>{
        return <Comment arthur = {comment.username} content ={comment.content} ></Comment>
      })}
      <div className = "addComments" style = {{visibility:hover === id?"visible":"hidden"}} >
        <form action ={submit} >
          <input type = "hidden" name ="email" value = {user.email} ></input>
          <input type = "hidden" name ="id" value = {user.id} ></input>
          <input type = "hidden" name ="postId" value = {id} ></input>
          <textarea name = "content"></textarea>
          <button type = "submit"> Submit! </button>
        </form>
        
      </div>
    </div>    
  )  
}

export default Post;