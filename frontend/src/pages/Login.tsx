import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/auth-page.css";

export default function Login({
  saveToken,
}: {
  saveToken: (token: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      saveToken(response.data.token);
      navigate("/dashboard");
    } catch {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className='auth-page'>
      <form className='form-container' onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit' className='btn-primary'>
          Login
        </button>
      </form>
    </div>
  );
}
