import { useState } from "react";

const useForm = (initialState) => {
  const [formState, setFormState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormState(initialState);
  };

  return [formState, handleChange, resetForm];
};

export default useForm;
