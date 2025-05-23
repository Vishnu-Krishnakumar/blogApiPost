async function getPosts() {
  try {
    const response = await fetch("https://blogapi-rqj2.onrender.com/posts", {
      mode: "cors",
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getAllposts(){
  try{
    const response = await fetch("https://blogapi-rqj2.onrender.com/posts/allPosts",{
      mode:"cors",
      method: "GET",
      credentials: "include",
      headers:{
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error){
    console.error(error);
  }
}


async function log(formData) {
  const body = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  let verified = {};
  await fetch("https://blogapi-rqj2.onrender.com/user/login", {
    mode: "cors",
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((response) => {
      localStorage.setItem("authToken", response.token);
      let tokenArray = response.token.split('.');
      let user = JSON.parse(atob(tokenArray[1])).user;
      verified = {user:user , verify: true}
    })
    .catch((error) => console.error(error));
    return verified;
}

async function register(formData){
  const body ={
    firstname:formData.get("firstname"),
    lastname:formData.get("lastname"),
    email:formData.get("email"),
    password:formData.get("password"),
    passwordRE:formData.get("passwordRE"),
    author:"false",
  }
  try{
  let response = await fetch (`https://blogapi-rqj2.onrender.com/user/register`,{
    mode: "cors",
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type":"application/json",
    },
    body: JSON.stringify(body),
   })
   if(response.status === 201){
    return true;
   }
   else return response.json();
  }catch(error){

    console.log(error);
  }
}

async function getComments(postId){
  try{
  const response = await fetch(`https://blogapi-rqj2.onrender.com/comments/${postId}`, {
    mode:"cors",
    method:"GET",
    credentials:"include",
    headers:{
      "Content-Type":"application/json",
    },
  });
  const comments =  await response.json();
  return comments;
  }catch(error){
    console.log(error);
  }
}

async function postComments(formData){

  const body ={
    email:formData.get("email"),
    id:formData.get("id"),
    postId:formData.get("postId"),
    content:formData.get("content"),
  }
   try{
    const response = await fetch(`https://blogapi-rqj2.onrender.com/comments/${formData.get("postId")}`,{
      mode:"cors",
      method:"POST",
      credentials:"include",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify(body),
    }).then((response) =>response.json())
    .then((response)=> {return response});
   }catch(error){
    console.log(error);
   }
}

export { getPosts, log,getComments,postComments,register,getAllposts };
