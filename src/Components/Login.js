import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Hook to navigate to different pages

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    
    // Assuming you've done the necessary login validation
    // Redirect to email verification page
    navigate('/Verification');
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleLoginSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
