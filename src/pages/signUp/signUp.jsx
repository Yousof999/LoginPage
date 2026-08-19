import { useState } from 'react'
import './signUp.css'
import { Link, useNavigate } from 'react-router-dom'

function SignUp() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()

    if (password !== confirmPassword) {
      return
    }

    navigate('/')
    localStorage.clear()
    localStorage.setItem("emails", JSON.stringify(email))
    localStorage.setItem("passwords", JSON.stringify(password))
  }
  

  return (
    <div className="login-page d-flex align-items-center justify-content-center">
      <div className="login-card shadow-sm">
        <div className="login-card-header text-center mb-4">
          <h1>Create account</h1>
          <p className="text-muted mb-0">Start your journey today</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="mb-3">
            <label htmlFor="signupName" className="form-label">Full name</label>
            <input
              id="signupName"
              type="text"
              className="form-control"
              placeholder="Jane Doe"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="signupEmail" className="form-label">Email address</label>
            <input
              id="signupEmail"
              type="email"
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="signupPassword" className="form-label">Password</label>
            <input
              id="signupPassword"
              type="password"
              className="form-control"
              placeholder="Create password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={6}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
            <input
              id="confirmPassword"
              type="password"
              className="form-control"
              placeholder="Repeat password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Create account</button>

          <div className="text-center mt-4 text-muted small">
            Already have an account? <Link to="/">Log in</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
