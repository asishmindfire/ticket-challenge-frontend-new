import "../NavbarStyle/HomeNavbar.css";
import { Link } from "react-router-dom";

const HomeNavbar = () => {
  return (
    <>
      <header className="text-bg-dark" id="navbar_style">
        <div className="container-fluid">
          {/* <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-between"> */}
          <div>
            <ul
              // className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-end mb-md-0"
              className="nav d-flex col-lg-auto me-lg-auto mb-2 justify-content-between mb-md-0"
              id="navbar_ul"
            >
              <li className="ms-2 me-5">
                <h2 className="brand-logo">TMS</h2>
              </li>

              <div className="d-flex">
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
              </div>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default HomeNavbar;
