/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userUpdate } from '../core/actions';

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
        throw new Error('error pls try again');
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
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="login" className="form-label">Login</label>
        <input disabled={loading} type="text" className="form-control" id="login" aria-describedby="loginHelp" />
      </div>
      <div className="mb-3">
        <label htmlFor="pwd" className="form-label">Password</label>
        <input disabled={loading} type="password" className="form-control" id="pwd" />
      </div>
      <button disabled={loading} type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}
