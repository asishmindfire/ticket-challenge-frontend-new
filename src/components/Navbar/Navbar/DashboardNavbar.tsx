import "../NavbarStyle/DashboardNavbar.css";
import { Avatar } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import AlertDialog from "../../ConfirmationAlert/ConfirmationAlert";
import { useState } from "react";

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const user: any = localStorage.getItem("user");
  const logedInUser = JSON.parse(user);

  const [togglePopup, setTogglePopup] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate(`/`);
  };

  return (
    <>
      <AlertDialog
        toggle={togglePopup}
        message="Are you sure, you want to exit."
        onClose={() => setTogglePopup(false)}
        onClick={() => {
          handleSignOut();
          setTogglePopup(false);
        }}
      />

      <header className="text-bg-dark" id="navbar_style">
        <div className="container-fluid">
          <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-lg-between">
            <div className="ms-2 me-5">
              <h2 className="brand-logo">TMS</h2>
            </div>

            <div className="d-flex">
              <div className="d-flex me-2">
                <Avatar sx={{ bgcolor: "primary.light" }}>
                  {logedInUser.user.user_name.charAt(0)}
                </Avatar>
                <i id="avatar_name">{logedInUser.user.user_name}</i>
              </div>

              <ExitToAppIcon
                className="signout-icon"
                // onClick={() => handleSignOut()}
                onClick={() => setTogglePopup(true)}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default DashboardNavbar;
