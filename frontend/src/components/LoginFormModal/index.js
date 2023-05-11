import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
// import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const history = useHistory()

  const checkstat = () => {
    if(credential.length < 4 || password.length < 6){
      return true
    }else return false
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal, history.push('/'))
      .catch(async (res) => {
        const data = await res.json();
        // console.log(data, 'error login')
        if (data.message) {
          setErrors(data);
        }
      });
    };

    // console.log(errors, 'test errors')
  const demo = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' }))
    .then(closeModal, history.push('/'))
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          {errors ? <div>{errors.message}</div> : <div></div>}
        </div>
        <label>
          Username or Email
          <input
            type="text"
            placeholder="Username or Email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button type="submit" disabled={checkstat()}>Log In</button>
      </form>
      <div>
        <button onClick={demo}>Demo User</button>
      </div>
    </>
  );
}

export default LoginFormModal;
