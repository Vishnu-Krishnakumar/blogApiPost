import { parseISO , getDate} from 'date-fns';
function Comment({postId,arthur,content,createdAt}){
  
  arthur = arthur.split("@");

  return(
    <div key = {parseISO(createdAt).toISOString()} className = "commentCard">
      <h3>{arthur[0]}</h3>
      <label>{parseISO(createdAt).toDateString()}</label>
      <p>{content}</p>
    </div>
  )   
}

export default Comment;