import { useState, ChangeEvent } from 'react';

// Define a type for the form values
interface FormValues {
  [key: string]: string | number | Array<string | number>;
}

const useForm = (initialState: FormValues = {}) => {
  const [valuesForm, setValuesForm] = useState<FormValues>(initialState);

  // Function to reset the form to the initial state
  const resetForm = (newFormState: FormValues = initialState) => {
    setValuesForm(newFormState);
  };

  // Function to update form values based on input changes
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setValuesForm((prevValues) => ({
      ...prevValues,
      [name]: value, // Update the value directly without nesting
    }));
  };

  return { valuesForm, handleInputChange, resetForm };
};

export default useForm;
