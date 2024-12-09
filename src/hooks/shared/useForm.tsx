import { DateTime } from 'luxon';
import { useState, ChangeEvent } from 'react';

type TargetEvent<T> = {
  target: {
    name: string;
    value: T | DateTime<boolean> | null | string;
  };
};

function useForm<T>(initialState: T) {
  const [valuesForm, setValuesForm] = useState<T>(initialState);

  // Function to reset the form to the initial state
  const resetForm = (newFormState: T = initialState) => {
    setValuesForm(newFormState);
  };

  // Function to update form values based on input changes
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement> | TargetEvent<T>) => {
    const { name, value } = event.target;
    setValuesForm((prevValues) => ({
      ...prevValues,
      [name]: value, // Update the value directly without nesting
    }));
  };

  return { valuesForm, handleInputChange, resetForm };
}

export default useForm;
