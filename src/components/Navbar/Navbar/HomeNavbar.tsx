import "../NavbarStyle/HomeNavbar.css";
import { Link } from "react-router-dom";

const HomeNavbar = () => {
  return (
    <>
      <header className="text-bg-dark" id="navbar_style">
        <div className="container-fluid">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <ul
              className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
              id="navbar_ul"
            >
              <li className="ms-2 me-5">
                <Link to="/" className="nav-link px-3" id="navbar_link">
                  Create
                </Link>
              </li>
              <li className="ms-2 me-2">
                <Link to="/login" className="nav-link px-3" id="navbar_link">
                  Manage
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default HomeNavbar;
