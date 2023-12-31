/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userUpdate } from '../core/actions';
import CredentialsForms from '../components/fight/components/CredentialsForm';
import './Auth.css';

export default function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    let context = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: event.target.login.value,
        password: event.target.pwd.value,
      }),
    };

    fetch(`${process.env.REACT_APP_API_URL}/auth`, context)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('please try again');
      })
      .then((response) => {
        context = {
          method: 'GET',
        };
        fetch(`${process.env.REACT_APP_API_URL}/user/${response}`, context)
          .then(
            (user) => {
              if (user.status === 200) {
                return user.json();
              }
              throw new Error('error fetching user');
            },
          )
          .then((userJson) => {
            dispatch(userUpdate({
              id: userJson.id,
              username: userJson.username,
              account: userJson.account,
              cardList: userJson.cardList,
              email: userJson.email,
              lastName: userJson.lastName,
              surName: userJson.surName,
            }));
            navigate('/menu');
          });
      })
      .catch((error) => toast.error(error.toString()))
      .finally(() => setLoading(false));
  };
  return (
    <div className="loginContainer">
      <h1 className="title">Login</h1>
      <CredentialsForms
        handleSubmit={handleSubmit}
        loading={loading}
        extraActions={(
          <button
            disabled={loading}
            type="button"
            onClick={() => navigate('/register')}
            className="btn btn-outline-primary"
          >
            No account? Register!
          </button>
        )}
      />
    </div>
  );
}
