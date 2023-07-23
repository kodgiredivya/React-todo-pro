import axios from 'axios'
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserState } from '../App'

export default function Login() {
  const { setlogin } = useContext(UserState)
  const [formData, setformData] = useState({
    e: "abc@gmail.com",
    p: "123"
  })
  const navigate = useNavigate()
  const handleLogin = async () => {
    console.log(formData);
    const { data } = await axios.get("http://localhost:5000/users")
    const result = data.find(item => item.userEmail === formData.e && item.password === formData.p)
    console.log("result",result);
    if((!!result)){
      setlogin(result)
      navigate('/account')
    }else{
      alert("Invalid Credentials")
    }
  }
  return (
    <div className='login-body'>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <div className="card login-card">
              <div className="card-header text-center text-light">
                <h3>User Login</h3>
              </div>
              <div className="card-body d-flex flex-column align-items-center">
                <div className='input-group'>
                  <label htmlFor="email" className="input-group-text">
                    <i className="bi bi-person-fill"></i>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.e}
                    onChange={e => setformData({ ...formData, e: e.target.value })}
                    id="email"
                    placeholder="Enter Your Email"
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">Please choose a username.</div>
                </div>
                <div className="mt-3 input-group">
                  <label htmlFor="password" className="input-group-text">
                    <i className="bi bi-lock-fill"></i>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={formData.p}
                    onChange={e => setformData({ ...formData, p: e.target.value })}
                    id="password"
                    placeholder="Enter Your Password"
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">Please choose a username.</div>
                </div>
                
                <button onClick={handleLogin} type="button" className="login-btn btn mt-3">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
