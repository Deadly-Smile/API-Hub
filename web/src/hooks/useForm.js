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

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormState({
      ...formState,
      [name]: e.target.files[0],
    });
  };

  const resetForm = () => {
    setFormState(initialState);
  };

  return [formState, handleChange, resetForm, setFormState, handleFileChange];
};

export default useForm;
