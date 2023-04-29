import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Login(props) {
    const [ceredential, setCeredential] = useState({email:"", password:""})
    let history = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email:ceredential.email, password:ceredential.password })
          });
          const json = await response.json()
          if(json.success){
            localStorage.setItem('token', json.authtoken)
            history("/", {push:true})
            props.showAlert("Success", "success")
          }else{
            props.showAlert("Invalid", "danger")
          }
          console.log(json);
    }
    const onChange = (event)=>{
        setCeredential({...ceredential, [event.target.name]:event.target.value})
    }
    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={ceredential.email} aria-describedby="emailHelp" onChange={onChange}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={ceredential.password} onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}
