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
      let tokenArray = response.token.split('.');
      let user = JSON.parse(atob(tokenArray[1])).user;
      verified = {user:user , verify: true}
    })
    .catch((error) => console.error(error));
    return verified;
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
  console.log(comments);
  return comments;
  }catch(error){
    console.log(error);
  }
}

export { getPosts, log,getComments };
