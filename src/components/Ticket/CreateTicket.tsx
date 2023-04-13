import React, { useState } from "react";
import "./CreateTicket.css";
import services from "../../service/http";
// import Error from "../Error/Error";
import validation from "./validation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateTicket = () => {
//   const [error, setError] = useState(false);
//   const [errMsg, setErrMsg] = useState("");
  const [formError, setFormError] = useState<any>({});

  const [ticket, setTicket] = useState({
    product: "",
    ticketname: "",
    ticketdescription: "",
    created_by: "",
    assign_to: "",
    status: "BACKLOG",
    email: "",
  });

  const onCategorySelection = (e: any) => {
    setTicket({ ...ticket, product: e.target.value });
  };

  const ticketdetailsOnChange = (e: any) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async () => {
    try {
      const err = validation(ticket);
      if (Object.keys(err).length === 0) {
        setFormError({});
        const data = await services.postRequest("/ticket", ticket);
        if (!data.data.status) {
        //   setError(true);
        //   setErrMsg("Unable to create ticket, Please try after sometime.");
        toast.error(data.data.message);
          return;
        }
        toast.success("Ticket Created Successfully.");
        setTicket({
          product: "",
          ticketname: "",
          ticketdescription: "",
          created_by: "",
          assign_to: "",
          status: "BACKLOG",
          email: "",
        });
      } else {
        setFormError(err);
      }
    } catch (error: any) {
    //   setError(true);
    //   setErrMsg("Unable to create ticket, Please try after sometime.");
      toast.error("Unable to create ticket, Please try after sometime.");
    }
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

      <div className="create-ticket-form">
        <h1 className="create-ticket-header">Create Ticket</h1>

        <div className="form-group mb-3">
          <label htmlFor="recipient-name" className="col-form-label">
            Product:
          </label>
        <select
          className="form-control col-md-1 mb-2"
          onChange={onCategorySelection}
        >
          <option value="0"> --Select-- </option>
          <option value="BUG"> Website </option>
          <option value="MOBILE_APP"> Mobile App </option>
          <option value="SUBSCRIPTION"> Subscription </option>
          <option value="GENERAL"> General </option>
          <option value="OTHER"> Other </option>
        </select>
        {formError.product && (
          <small className="form-text text-danger mb-1">
            {formError.product}
          </small>
        )}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="recipient-name" className="col-form-label">
            Title:
          </label>
          <input
            type="text"
            name="ticketname"
            className="form-control mt-0 p-2 text-start"
            id="recipient-name"
            placeholder="Enter ticket title"
            value={ticket.ticketname}
            onChange={ticketdetailsOnChange}
          />
          {formError.ticketname && (
            <small className="form-text text-danger">
              {formError.ticketname}
            </small>
          )}
          {/* <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
          </small> */}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="message-text" className="col-form-label">
            Description:
          </label>
          <textarea
            className="form-control"
            name="ticketdescription"
            id="message-text1"
            placeholder="Enter ticket description"
            value={ticket.ticketdescription}
            onChange={ticketdetailsOnChange}
          ></textarea>
          {formError.ticketdescription && (
            <small className="form-text text-danger">
              {formError.ticketdescription}
            </small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="col-form-label">
            Email:
          </label>
          <input
            type="email"
            name="email"
            className="form-control mt-0 p-2 text-start"
            id="recipient-email"
            placeholder="Enter your email"
            value={ticket.email}
            onChange={ticketdetailsOnChange}
          />
          {formError.email && (
            <small className="form-text text-danger">{formError.email}</small>
          )}
        </div>

        <button
          type="submit"
          className="custom-btn"
          onClick={handleOnSubmit}
        >
          Create
        </button>
      </div>
    </>
  );
};

export default CreateTicket;
