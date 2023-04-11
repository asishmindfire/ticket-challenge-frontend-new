const validation = (values: any) => {
  let error: any = {};

  if (!values.ticketname) {
    error.ticketname = "Title is required.";
  }

  if (!values.ticketdescription) {
    error.ticketdescription = "Description is required.";
  }

  if (!values.email) {
    error.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    error.email = "Email is invalid.";
  }

  if (!values.product) {
    error.product = "Please select a Product.";
  }

  return error;
};

export default validation;
