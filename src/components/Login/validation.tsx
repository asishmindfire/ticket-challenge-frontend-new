const validation = (values: any) => {
  let error: any = {};

  if (!values.email) {
    error.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    error.email = "Email is invalid.";
  }

  if (!values.password) {
    error.password = "Password is required.";
  } else if (!(values.password.length >= 8)) {
    error.password = "Password should be at least of 8 character.";
  }

  return error;
};

export default validation;
