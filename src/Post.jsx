import {getComments} from "./serverUtils/server"
function Post({title,content,published,id,setHover, hover}) {
  function permaHover(){
    setHover(id);
    async function data(){
        await getComments(id);
    }
    data()
  }
  return (
    <div id = "postCard" className = {hover === id ?'permaCard':'card'} onClick ={permaHover}>
      <ul key = {id}>
        <h3>{title}</h3>
        <li>{content}</li>
      </ul>      
    </div>    
  )  
}

export default Post;