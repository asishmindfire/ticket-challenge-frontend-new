import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import services from "../../service/http";
import jwt from "jwt-decode";
// import Error from "../Error/Error";
import HomeNavbar from "../Navbar/Navbar/HomeNavbar";
import validation from "./validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  //   const [error, setError] = useState(false);
  //   const [errMsg, setErrMsg] = useState("");
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

      if (Object.keys(err).length === 0) {
        const signinResp = await services.postRequest("/auth/login", signin);
        if (!signinResp?.data.status) {
          //   setError(true);
          //   setErrMsg("Service Unavailable");
          toast.error(signinResp.data.message);
          return;
        }
        const user = jwt(signinResp.data.data);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", signinResp.data.data);
        // navigate("/dashboard");
        navigate("/dashboard", { state: { toggle: true }  });
        // window.location.reload();
      } else {
        setFormError(err);
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        toast.error("Username or password is incorrect.");
        return;
      }
      //   setError(true);
      //   setErrMsg("Service Unavailable");
      toast.error("Service Unavailable, Please try after sometime...");
    }
  };

  const handleOnChange = (event: any) => {
    setSignin({ ...signin, [event.target.name]: event.target.value });
  };

  //   const onCloseHandle = (value: any) => {
  //     setError(value);
  //   };

  return (
    <>
      <ToastContainer />

      {/* {error ? (
        <Error
          message={errMsg}
          onChange={(value: any) => {
            onCloseHandle(value);
          }}
        />
      ) : null} */}

      <HomeNavbar />

      {/* <div className="page designer-font">
        <div className="cover">
          <h1>Login</h1>
          
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={signin.email}
            onChange={handleOnChange}
          />
          {formError.email && (
            <small className="form-text text-danger">{formError.email}</small>
          )}
          

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={signin.password}
            onChange={handleOnChange}
          />
          {formError.password && (
            <small className=" text-danger">{formError.password}</small>
          )}

          <div className="signin-signup-btn">
            <div onClick={onSignIn}>Sign In</div>
          </div>
        </div>
      </div> */}

      <div className="login-card">
        <div className="create-login-form">
          <h1 className="create-ticket-header">Login</h1>

          <div className="form-group mb-4">
            <label htmlFor="recipient-name" className="col-form-label">
              Email:
            </label>
            <input
              className="form-control p-2 text-start"
              type="email"
              placeholder="Email"
              name="email"
              value={signin.email}
              onChange={handleOnChange}
            />
            {formError.email && (
              <small className="form-text text-danger">{formError.email}</small>
            )}
          </div>

          <div className="form-group mb-5">
            <label htmlFor="email" className="col-form-label">
              Password:
            </label>
            <input
              className="form-control p-2 text-start"
              type="password"
              placeholder="Password"
              name="password"
              value={signin.password}
              onChange={handleOnChange}
            />
            {formError.password && (
              <small className=" text-danger">{formError.password}</small>
            )}
          </div>

          <button type="submit" className="custom-btn" onClick={onSignIn}>
            Create
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
