import { useEffect, useState } from 'react'
import './login.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const navigate = useNavigate()
  const signupEmail = localStorage.getItem("emails")
  const signupPassword = localStorage.getItem("passwords")
  function handleSubmit() {
    if(signupEmail == `"${email}"`  && signupPassword == `"${password}"`) {
      navigate("/")
    } else {
      alert("Email or password is wrong")
    }
  }


  return (
    <div className="login-page d-flex align-items-center justify-content-center">
      <div className="login-card shadow-sm">
        <div className="login-card-header text-center mb-4">
          <h1>Welcome back</h1>
          <p className="text-muted mb-0">Sign in to continue to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="mb-3">
            <label htmlFor="loginEmail" className="form-label">Email address</label>
            <input
              id="loginEmail"
              type="email"
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="loginPassword" className="form-label">Password</label>
            <input
              id="loginPassword"
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={6}
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input
                id="rememberMe"
                type="checkbox"
                className="form-check-input"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
              />
              <label htmlFor="rememberMe" className="form-check-label">Remember me</label>
            </div>
            <button type="button" className="btn btn-link p-0">Forgot password?</button>
          </div>

          <button type="submit" className="btn btn-primary w-100">Log in</button>

          <div className="text-center mt-4 text-muted small">
            Don&apos;t have an account? <Link to="/signup">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
