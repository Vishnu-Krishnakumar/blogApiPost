import { useState,useEffect  } from 'react'
import Login from "./LogIn";
import Post from "./Post"
import Navigation from './Navigation';
import './App.css'
import {getAllposts} from "./serverUtils/server"
import { Link } from "react-router-dom";
function App() {
  const [logIn, setLogin] = useState({user:null, verify:false});
  const [posts, setPosts] = useState([]);
  const [hover,setHover] = useState(-1)


  useEffect(()=>{  
    try{
      let token = localStorage.getItem("authToken");
      if (token === null) return;
      const currentTimestamp = Math.floor(Date.now() / 1000);
 
      token = token.split('.');
      let exp = JSON.parse(atob(token[1])).exp;

      token = JSON.parse(atob(token[1])).user;
      if(exp < currentTimestamp){
        return console.log("token expired")
      }
      else{
        setLogin({user:token,verify:true});
    } 
    }catch(error){console.log(error)}
    
  },[])
 
  useEffect( () => {
    if (logIn.verify) {
      async function fetch() {
        let data = await getAllposts();

        setPosts(data);
      }
      fetch();     
    }
   }, [logIn]);
  
  return (
    <>
      {logIn.verify && <Navigation setLogIn={setLogin}></Navigation>}
      
      {!logIn.verify ? (
      <div>
        <Login logIn ={logIn}setLogin={setLogin}></Login>
        <Link to ="register">Register a new account!</Link>
      </div>
      ):
      (
        <>
            <h1>Welcome {logIn.user.firstname}!</h1>
            <h2>Click on a post title to read and comment on!</h2>
            <div className ="allPosts">
              {posts.map((post) => {
                if(post.published === false) return
                if(hover === -1 || hover === post.id && post.published === true)
                return <Post title ={post.title} content = {post.content} createdAt = {post.createdAt} id ={post.id} published = {post.published} hover = {hover} setHover = {setHover} user = {logIn.user} ></Post>
                else return
                }
              )}
            </div>
           
        </>
      )}
    </>
  )
}

export default App
