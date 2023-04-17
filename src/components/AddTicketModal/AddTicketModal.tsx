import { useState, useEffect } from "react";
import Services from "../../service/http";
import "./AddTicketModal.css";
import validation from "./validation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddTicketModal(props: any) {
  const user: any = localStorage.getItem("user");
  const logedInUser = JSON.parse(user);

  const [ticket, setTicket] = useState({
    product: "",
    ticketname: "",
    ticketdescription: "",
    created_by: logedInUser.user._id,
    assign_to: "",
    status: "BACKLOG",
    email: "",
  });

  const [users, setUsers] = useState([]);
  const [formError, setFormError] = useState<any>({});
  // const [isDismissModal, setIsDismissModal] = useState<boolean>(false);


  useEffect(() => {
    async function fetchUser() {
      try {
        const users = await Services.getRequest("/user");
        if (!users.data.status) {
          toast.error(users.data.message);
          return;
        }
        setUsers(users.data.data);
      } catch (error) {
        toast.error("Currently, we are unable to get user details, Please try after sometime...");
      }
    }
    fetchUser();
  }, []);

  const onCategorySelection = (e: any) => {
    setTicket({ ...ticket, product: e.target.value });
  };

  const onUserSelection = (e: any) => {
    setTicket({ ...ticket, assign_to: e.target.value });
  };

  const ticketdetailsOnChange = (e: any) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async () => {
    try {
      const err = validation(ticket);
      if (Object.keys(err).length === 0) {
        // setIsDismissModal(true);
        window.location.reload();
        setFormError({});
        const data = await Services.postRequest("/ticket", ticket);
        if (!data.data.status) {
          toast.error(data.data.message);
          return;
        }
        setTicket({
          product: "",
          ticketname: "",
          ticketdescription: "",
          created_by: "",
          assign_to: "",
          status: "BACKLOG",
          email: "",
        });
        props.onChange();
      } else {
        setFormError(err);
      }
      
    } catch (error) {
      toast.error("Currently, we are unable to create ticket, Please try after sometime.");
    }
  };

  return (
    <>
      <ToastContainer />

      {/* <!-- Button trigger modal --> */}

      <button
        type="button"
        className="add_button"
        data-bs-toggle="modal"
        data-bs-target="#addTicketModal"
      >
        Add
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="addTicketModal"
        tabIndex={-1}
        aria-labelledby="addTicketModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addTicketModalLabel">
                Add Ticket
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="close"
              ></button>
            </div>
            <div className="modal-body">
              
            <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">
                Product:
                </label>
              <select
                className="form-control col-md-1"
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
            <small className="form-text text-danger">
              {formError.product}
            </small>
          )}
          </div>

              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">
                  Title:
                </label>
                <input
                  type="text"
                  name="ticketname"
                  className="form-control text-start mt-0 pt-2"
                  id="recipient-name"
                  placeholder="Enter ticket name"
                  value={ticket.ticketname}
                  onChange={ticketdetailsOnChange}
                />
                 {formError.ticketname && (
            <small className="form-text text-danger">
              {formError.ticketname}
            </small>
          )}
              </div>
              <div className="mb-3">
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
              <select
                className="form-control col-md-1"
                onChange={onUserSelection}
              >
                <option value="0"> --Assign To-- </option>
                {users?.map((el: any) => {
                  return (
                    <option key={el._id} value={el._id}>
                      {el.user_name}
                    </option>
                  );
                })}
              </select>

              {formError.assign_to && (
            <small className="form-text text-danger">
              {formError.assign_to}
            </small>
          )}

              {/* <select
                className="form-control col-md-1 mt-4"
                onChange={onStatusSelection}
              >
                <option value="0"> --Status-- </option>
                <option value="BACKLOG"> Backlog </option>
                <option value="INPROGRESS"> Inprogress </option>
                <option value="DONE"> Done </option>
              </select>
              {formError.status && (
            <small className="form-text text-danger">
              {formError.status}
            </small>
          )} */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  // data-bs-dismiss={isDismissModal ? "modal" : null}
                  // data-bs-dismiss="modal"
                  className="btn btn-primary"
                  onClick={handleOnSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
