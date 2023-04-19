import "./CreateTicket.css";
import services from "../../service/http";
import validation from "./validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "../CustomHooks/useForm";

const CreateTicket = () => {
  const addTicket = async () => {
    try {
      const data = await services.postRequest("/ticket", values);
      if (!data.data.status) {
        toast.error(data.data.message);
        return;
      }
      toast.success("Ticket Created Successfully.");
    } catch (error: any) {
      toast.error("Unable to create ticket, Please try after sometime.");
    }
  };

  const { handleChange, values, errors, handleSubmit } = useForm(
    addTicket,
    {
      product: "",
      ticketname: "",
      ticketdescription: "",
      created_by: "",
      assign_to: "",
      status: "BACKLOG",
      email: "",
    },
    validation
  );

  return (
    <>
      <ToastContainer />

      <div className="create-ticket-form">
        <h1 className="create-ticket-header">Create Ticket</h1>

        <div className="form-group mb-3">
          <label htmlFor="recipient-name" className="col-form-label">
            Product:
          </label>
          <select
            className="form-control col-md-1 mb-2"
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
            <small className="form-text text-danger mb-1">
              {errors.product}
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
            value={values.ticketname}
            onChange={handleChange}
          />
          {errors.ticketname && (
            <small className="form-text text-danger">{errors.ticketname}</small>
          )}
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
            value={values.ticketdescription}
            onChange={handleChange}
          ></textarea>
          {errors.ticketdescription && (
            <small className="form-text text-danger">
              {errors.ticketdescription}
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
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && (
            <small className="form-text text-danger">{errors.email}</small>
          )}
        </div>

        <button type="submit" className="custom-btn" onClick={handleSubmit}>
          Create
        </button>
      </div>
    </>
  );
};

export default CreateTicket;
