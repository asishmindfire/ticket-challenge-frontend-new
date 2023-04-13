import DashboardNavbar from "../Navbar/Navbar/DashboardNavbar";
import TicketTables from "../TicketTables/TicketTables";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const Dashboard = () => {

    useEffect(() => {
        toast.success("LoggedIn Successfully.");
    },[])

  return (
    <>
      <DashboardNavbar />
      <TicketTables />
    </>
  );
};

export default Dashboard;
