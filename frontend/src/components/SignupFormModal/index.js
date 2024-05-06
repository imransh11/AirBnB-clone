import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./signup.css"

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const checkStat = () => {
    if(((((username.length < 4 || password.length < 6) || (!email)) || (!firstName)) || (!lastName)) || (confirmPassword !== password)){
      return true
    } else return false
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )

        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          // console.log(data, 'in errors')
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field does not match the Password field"
    });
  };

  return (
    <>
    <div className="sign-up-main">
      <div className="sign-up-title">
        <h1>Sign Up</h1>
      </div>
      <div className="sign-up-form">
        <form onSubmit={handleSubmit}>
          <div className="signupFormField">
            <label>
              <div className="sign-up-content">
                <div className="sign-up-content-title">
                  Email &nbsp;
                </div>
                <div className="">
                  <input
                    className="signupContentField"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
                {errors.email && <div style={{color: 'red'}}>{errors.email}</div>}
            </label>
          </div>
          <div className="signupFormField">
            <label>
              <div className="sign-up-content">
                <div className="sign-up-content-title">
                  Username &nbsp;
                </div>
                <div>
                  <input
                    className="signupContentField"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              {errors.username && <div style={{color: 'red'}}>{errors.username}</div>}
            </label>
          </div>
          <div className="signupFormField">
            <label>
              <div className="sign-up-content">
                <div className="sign-up-content-title">
                  First Name &nbsp;
                </div>
                <div>
                  <input
                    className="signupContentField"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
              </div>
              {errors.firstName && <div style={{color: 'red'}}>{errors.firstName}</div>}
            </label>
          </div>
          <div className="signupFormField">
            <label>
              <div className="sign-up-content">
                <div className="sign-up-content-title">
                  Last Name &nbsp;
                </div>
                <div>
                  <input
                    className="signupContentField"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              {errors.lastName && <div style={{color: 'red'}}>{errors.lastName}</div>}
            </label>
          </div>
          <div className="signupFormField">
            <label>
              <div className="sign-up-content">
                <div className="sign-up-content-title">
                  Password &nbsp;
                </div>
                <div>
                  <input
                    className="signupContentField"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              {errors.password && <div>{errors.password}</div>}
            </label>
          </div>
          <div className="signupFormField">
            <label>
              <div className="sign-up-content">
                <div className="sign-up-content-title">
                  Confirm Password &nbsp;
                </div>
                <div>
                  <input
                    className="signupContentField"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
                {errors.confirmPassword && (
                  <div style={{color: 'red'}}>{errors.confirmPassword}</div>
                )}
            </label>
          </div>
          <button className="signupFormSubmit-btn" type="submit" >Sign Up</button>
          {/* disabled={checkStat()} */}
        </form>
      </div>
    </div>
    </>
  );
}

export default SignupFormModal;
