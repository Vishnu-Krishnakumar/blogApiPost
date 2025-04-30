import { useState,useEffect  } from 'react'
import Login from "./LogIn";
import './App.css'
// const server = require("./serverUtils/server");
import {getPosts} from "./serverUtils/server"
function App() {
  const [logIn, setLogin] = useState(false);
  const [posts, setPosts] = useState([]);
   useEffect( () => {
    if (logIn) {
      // async function getPosts() {
      //   try {
      //     const response = await fetch("https://blogapi-rqj2.onrender.com/posts", {
      //       mode: "cors",
      //       method: "GET",
      //       credentials: "include",
      //       headers: {
      //         'Content-Type': 'application/json'
      //       },
      //     });
      //     const data = await response.json();
      //     setPosts(data);
      //   } catch (error) {
      //     console.error(error);
      //   }
      // }
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
      {!logIn ? (<Login logIn={logIn} set={setLogin}></Login>) :
      (
        <>
            <h1>You are logged in</h1>
            <ul>
              {posts.map((post) => {
                return <li key={post.id}>{post.title}</li>
              }
              )}
            </ul>
        </>
      )}
    </>
  )
}

export default App
