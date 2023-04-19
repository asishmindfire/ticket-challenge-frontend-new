import DashboardNavbar from "../Navbar/Navbar/DashboardNavbar";
import TicketTables from "../TicketTables/TicketTables";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const Dashboard = () => {

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
