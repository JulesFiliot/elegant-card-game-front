/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './CredentialsForm.css';

export default function CredentialsForms({
  handleSubmit, loading, isRegisterForm, extraActions,
}) {
  return (
    <div className="authContainer">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="login" className="form-label">Login</label>
          <input disabled={loading} type="text" className="form-control" id="login" aria-describedby="loginHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label">Password</label>
          <input disabled={loading} type="password" className="form-control" id="pwd" />
        </div>
        {isRegisterForm && (
          <>
            <div className="mb-3">
              <label htmlFor="surname" className="form-label">Surname</label>
              <input disabled={loading} type="text" className="form-control" id="surname" />
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">Lastname</label>
              <input disabled={loading} type="text" className="form-control" id="lastname" />
            </div>
          </>
        )}
        <div className="btnContainer">
          <button disabled={loading} type="submit" className="btn btn-primary">Submit</button>
          {extraActions}
        </div>
      </form>
    </div>
  );
}
