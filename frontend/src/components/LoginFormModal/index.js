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
    <div className="sign-up-main">
      <div className="sign-up-title">
        <h1>Log In</h1>
      </div>
      <div className="sign-up-form">
        <form onSubmit={handleSubmit}>
          <div>
            {errors ? <div style={{color: 'red', fontWeight: 'bold'}}>{errors.message}</div> : <div></div>}
          </div>
          <div className="signupFormField">
            <label>
              <div className="sign-up-content">
                <div className="sign-up-content-title">
                  Username or Email &nbsp;
                </div>
                <div>
                  <input
                    className="signupContentField"
                    type="text"
                    placeholder="Username or Email"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                  />
                </div>
              </div>
            </label>
          </div>
          <div className="signupFormField">
            <label>
              <div className="sign-up-content">
                <div className="sign-up-content-title">
                  Password &nbsp;
                </div>
                <div >
                  <input
                  className="signupContentField"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
                {errors.credential && (
                  <div style={{color: 'red'}}>{errors.credential}</div>
                )}
            </label>
          </div>
          <button className="signupFormSubmit-btn" type="submit">Log In</button>
        </form>
        <div>
          <button className="signupFormSubmit-btn" onClick={demo}>Demo User</button>
        </div>
      </div>
    </div>
    </>
  );
}

export default LoginFormModal;
