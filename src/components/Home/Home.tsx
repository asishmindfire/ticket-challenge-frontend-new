import HomeNavbar from "../Navbar/Navbar/HomeNavbar";
import CreateTicket from "../Ticket/CreateTicket";
import "./Home.css";

const Home = () => {
  return (
    <>
      <HomeNavbar />
      <div className="create-ticket-card">
        <CreateTicket />
      </div>
    </>
  );
};

export default Home;
