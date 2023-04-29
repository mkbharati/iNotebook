import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
export default function Signup(props) {
    const [ceredential, setCeredential] = useState({ name: "", email: "", password: "" })
    let history = useNavigate();
    const handleSubmit = async (e) => {
        const { name, email, password } = ceredential
        e.preventDefault();
        const response = await fetch("/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json()
        console.log(json);

        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            history("/", { push: true })
            props.showAlert("Success", "success")
        } else {
            alert("User alredy exist")
            props.showAlert("Invalid", "danger")
        }

    }
    const onChange = (event) => {
        setCeredential({ ...ceredential, [event.target.name]: event.target.value })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={ceredential.name} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={ceredential.email} aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={ceredential.password} onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
