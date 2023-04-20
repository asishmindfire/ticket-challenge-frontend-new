import { useState, useEffect } from "react";
import Services from "../../service/http";
import "./AddTicketModal.css";
import validation from "./validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "../CustomHooks/useForm";

export default function AddTicketModal(props: any) {
  const user: any = localStorage.getItem("user");
  const logedInUser = JSON.parse(user);

  const [users, setUsers] = useState([]);

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
        toast.error(
          "Currently, we are unable to get user details, Please try after sometime..."
        );
      }
    }
    fetchUser();
  }, []);

  const addTicketForm = async () => {
    try {
      const data = await Services.postRequest("/ticket", values);
      if (!data.data.status) {
        toast.error(data.data.message);
        return;
      }
      window.location.reload();
    } catch (error) {
      toast.error(
        "Currently, we are unable to create ticket, Please try after sometime."
      );
    }
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    addTicketForm,
    {
      product: "",
      ticketname: "",
      ticketdescription: "",
      created_by: logedInUser.user._id,
      assign_to: "",
      status: "BACKLOG",
      email: "",
    },
    validation
  );

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
                  name="product"
                  value={values.product}
                  onChange={handleChange}
                >
                  <option value="0"> --Select-- </option>
                  <option value="WEBSITE"> Website </option>
                  <option value="MOBILE_APP"> Mobile App </option>
                  <option value="SUBSCRIPTION"> Subscription </option>
                  <option value="GENERAL"> General </option>
                  <option value="OTHER"> Other </option>
                </select>
                {errors.product && (
                  <small className="form-text text-danger">
                    {errors.product}
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
                  value={values.ticketname}
                  onChange={handleChange}
                />
                {errors.ticketname && (
                  <small className="form-text text-danger">
                    {errors.ticketname}
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
                  value={values.ticketdescription}
                  onChange={handleChange}
                ></textarea>

                {errors.ticketdescription && (
                  <small className="form-text text-danger">
                    {errors.ticketdescription}
                  </small>
                )}
              </div>

              <select
                className="form-control col-md-1"
                name="assign_to"
                value={values.assign_to}
                onChange={handleChange}
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

              {errors.assign_to && (
                <small className="form-text text-danger">
                  {errors.assign_to}
                </small>
              )}

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>

                <button
                  type="submit"
                  // data-bs-dismiss="modal"
                  className="btn btn-primary"
                  onClick={handleSubmit}
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
