import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Header from './Header';

function AdminDashboard() {
  let navigate = useNavigate();
  useEffect(() => {
    async function verifyAuth() {
      try {
        let { data } = await axios.get("/api/auth",
          {
            headers: {
              "auth-token": JSON.parse(localStorage.getItem("token")).token
            }
          });
        if (data.payload.role !== "admin") {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
    verifyAuth();
  }, [])
  return (
    <>
      <Header />
      <h1>AdminDashboard</h1>

      <div className="main-container">
        <img
          src="https://pngimg.com/uploads/book/book_PNG51090.png"
          alt="login"
          style={{ width: "10%" , marginLeft: "50px"}}
        />
        <div className='sub-container'>
          {" "}
          <span>Book Name</span>
          <span>Author-Name</span>
          <span>Synopsis</span>
          <button className="button_1">button-1</button>
          <button className="button_2">button-2</button>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard