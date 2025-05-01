
function Comment({postId,arthur,content}){
  
  arthur = arthur.split("@");

  return(
    <div className = "commentCard">
      <h3>{arthur[0]}</h3>
      <p>{content}</p>
    </div>
  )   
}

export default Comment;