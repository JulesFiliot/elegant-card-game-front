import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import CredentialsForms from '../components/fight/components/CredentialsForm';
import './Auth.css';

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const payload = {
      login: event.target.login.value,
      pwd: event.target.pwd.value,
      lastName: event.target.lastname.value,
      surName: event.target.surname.value,
      account: 100000,
    };

    if (!payload.login || !payload.pwd || !payload.lastName || !payload.surName) {
      toast.error('Error please fill all fields');
      setLoading(false);
      return;
    }

    const context = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    fetch(`${process.env.REACT_APP_API_URL}/user`, context)
      .then(() => {
        toast.success('Account created');
        navigate('/auth');
      })
      .catch((err) => toast.error(err.toString()))
      .finally(() => setLoading(false));
  };

  return (
    <div className="loginContainer">
      <h1 className="title">Register</h1>
      <CredentialsForms
        isRegisterForm
        handleSubmit={handleSubmit}
        loading={loading}
        extraActions={(
          <button
            disabled={loading}
            type="button"
            onClick={() => navigate('/auth')}
            className="btn btn-outline-primary"
          >
            Never mind, back to login.
          </button>
        )}
      />
    </div>
  );
}
