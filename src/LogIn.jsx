import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {log} from "./serverUtils/server"
function Login({set}) {
  async function logIn(formData) {
    set(log(formData)) 
  }
  return (
    <>
    <ErrorBoundary
      fallback={<p>There was an error while submitting the form</p>}
    >
      <form action ={logIn}>
        <label >Email:</label>
        <input type = "email" id = "email" name ="email"></input>
        <label >Password:</label>
        <input type ="password" id ="paswword" name ="password"></input>
        <button  type = "submit">LogIn</button>
      </form>
    </ErrorBoundary>
    </>
    )
}

export default Login;