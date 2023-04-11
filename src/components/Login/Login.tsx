import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import services from "../../service/http";
import jwt from "jwt-decode";
import Error from "../Error/Error";
import HomeNavbar from "../Navbar/Navbar/HomeNavbar";
import validation from "./validation";

const LoginForm = () => {
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [formError, setFormError] = useState<any>({});

  const [signin, setSignin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  //   const handleOnClick = () => {
  //     navigate(`/signup`);
  //   };

  const onSignIn = async () => {
    try {
        const err = validation(signin);
        console.log({err});
        
      if (Object.keys(err).length === 0) { 
          const signinResp = await services.postRequest("/auth/login", signin);
          if (!signinResp.data.status) {
              setError(true);
              setErrMsg("Service Unavailable");
              return;
            }
        const user = jwt(signinResp.data.data);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", signinResp.data.data);
        navigate("/dashboard");
        // window.location.reload();
      } else {
        setFormError(err);
      }
    } catch (error: any) {
      setError(true);
      setErrMsg("Service Unavailable");
    }
  };

  const handleOnChange = (event: any) => {
    setSignin({ ...signin, [event.target.name]: event.target.value });
  };

  const onCloseHandle = (value: any) => {
    setError(value);
  };

  return (
    <>
      {error ? (
        <Error
          message={errMsg}
          onChange={(value: any) => {
            onCloseHandle(value);
          }}
        />
      ) : null}

      <HomeNavbar />

      <div className="page designer-font">
        <div className="cover">
          <h1>Login</h1>
          <input
            type="email"
            placeholder="email"
            name="email"
            value={signin.email}
            onChange={handleOnChange}
          />
          {formError.email && (
            <small className="form-text text-danger">
              {formError.email}
            </small>
          )}

          <input
            type="password"
            placeholder="password"
            name="password"
            value={signin.password}
            onChange={handleOnChange}
          />
          {formError.password && (
            <small className=" text-danger">
              {formError.password}
            </small>
          )}
          

          <div className="signin-signup-btn">
            <div onClick={onSignIn}>Sign In</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
