const validation = (values: any) => {
  let error: any = {};

  if (!values.ticketname) {
    error.ticketname = "Title is required.";
  }

  if (!values.ticketdescription) {
    error.ticketdescription = "Description is required.";
  }

  if (!values.product) {
    error.product = "Please select a Product.";
  }

  if (!values.assign_to) {
    error.assign_to = "Please select assignee";
  }

  return error;
};

export default validation;
