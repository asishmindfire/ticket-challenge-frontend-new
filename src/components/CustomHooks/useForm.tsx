import { useState } from "react";

export const useForm = (callback: any, initialState: any, validate: any) => {
  const [values, setValues] = useState<any>(initialState);
  const [errors, setErrors] = useState<any>({});

  const handleChange = (event: any) => {
    event.persist();
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    if (Object.keys(validate(values)).length === 0) {
        callback();
        setValues(initialState);
        setErrors({});
    } else {
        setErrors(validate(values));
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};
