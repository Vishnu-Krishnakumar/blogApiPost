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
      return true;
    })
    .catch((error) => console.error(error));
}

export { getPosts, log };
