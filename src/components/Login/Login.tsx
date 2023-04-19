import "./Login.css";
import { useNavigate } from "react-router-dom";
import services from "../../service/http";
import jwt from "jwt-decode";
import HomeNavbar from "../Navbar/Navbar/HomeNavbar";
import validation from "./validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "../CustomHooks/useForm";

const LoginForm = () => {
  const navigate = useNavigate();

  const onSignIn = async () => {
    try {
      const signinResp = await services.postRequest("/auth/login", values);
      if (!signinResp?.data.status) {
        toast.error(signinResp.data.message);
        return;
      }
      const user = jwt(signinResp.data.data);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", signinResp.data.data);
      navigate("/dashboard");
      // navigate("/dashboard", { state: { toggle: true }  });
    } catch (error: any) {
      if (error.response.status === 401) {
        toast.error("Username or password is incorrect.");
        return;
      }
      toast.error("Service Unavailable, Please try after sometime...");
    }
  };

  const { handleChange, values, errors, handleSubmit } = useForm(
    onSignIn,
    {
      email: "",
      password: "",
    },
    validation
  );

  return (
    <>
      <ToastContainer />

      <HomeNavbar />

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
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && (
              <small className="form-text text-danger">{errors.email}</small>
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
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && (
              <small className=" text-danger">{errors.password}</small>
            )}
          </div>

          <button type="submit" className="custom-btn" onClick={handleSubmit}>
            Create
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
