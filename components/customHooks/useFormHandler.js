import { useState } from 'react';

function useFormHandler(initialState, onSubmit) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({}); // Clear errors on change (optional)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(formData); // Replace with your validation logic
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData); // Call the provided onSubmit function with form data
    }
  };

  // Define your validation logic here (optional)
  const validate = (data) => {
    const validationErrors = {};
    if (!data.name) {
      validationErrors.name = 'Name is required';
    }
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      validationErrors.email = 'Please enter a valid email';
    }
    return validationErrors;
  };

  return { formData, errors, handleChange, handleSubmit };
}

export default useFormHandler;