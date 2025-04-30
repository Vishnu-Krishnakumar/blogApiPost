import { useState,useEffect  } from 'react'
import Login from "./LogIn";
import Post from "./Post"
import './App.css'
import {getPosts} from "./serverUtils/server"
function App() {
  const [logIn, setLogin] = useState({user:null, verify:false});
  const [posts, setPosts] = useState([]);
  const [hover,setHover] = useState(0)
  
  useEffect( () => {
    if (logIn.verify) {
      async function fetch() {
        let data = await getPosts();
        console.log(data);
        setPosts(data);        
      }
      fetch();

    }
   }, [logIn]);
  
  return (
    <>
      {!logIn.verify ? (<Login logIn ={logIn}setLogin={setLogin}></Login>) :
      (
        <>
            <h1>You are logged in {logIn.user.firstname}</h1>
              {posts.map((post) => {
                return <Post title ={post.title} content = {post.content} id ={post.id} published ={post.published} hover ={hover} setHover={setHover}></Post>
              }
              )}
        </>
      )}
    </>
  )
}

export default App
