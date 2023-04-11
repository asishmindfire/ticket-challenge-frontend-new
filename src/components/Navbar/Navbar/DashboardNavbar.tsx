import "../NavbarStyle/DashboardNavbar.css";
import { Avatar } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const user: any = localStorage.getItem("user");
  const logedInUser = JSON.parse(user);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate(`/`);
  };

  return (
    <>
      <header className="text-bg-dark" id="navbar_style">
        <div className="container-fluid">
          <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-lg-between">
            <div className="d-flex">
              <Avatar sx={{ bgcolor: "primary.light" }}>
                {logedInUser.user.user_name.charAt(0)}
              </Avatar>
              <i id="avatar_name">{logedInUser.user.user_name}</i>
            </div>
            <ExitToAppIcon
              className="signout-icon"
              onClick={() => handleSignOut()}
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default DashboardNavbar;
