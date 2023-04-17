import DashboardNavbar from "../Navbar/Navbar/DashboardNavbar";
import TicketTables from "../TicketTables/TicketTables";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
// import { useEffect, useRef } from "react";
// import { useLocation } from "react-router-dom";

const Dashboard = () => {
  // const location = useLocation();
  // const check = useRef<any>(location.state.toggle);
  // console.log({ location });
  // console.log({ location: location.state.toggle });

  useEffect(() => {
    toast.success("You have Successfully LoggedIn.");
  }, []);

  return (
    <>
      <ToastContainer />
      <DashboardNavbar />
      <TicketTables />
    </>
  );
};

export default Dashboard;
