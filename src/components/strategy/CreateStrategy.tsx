import DateRangeValue from '@components/date_range/DateRangeCalendarValue';
import { createStrategyMutation } from '@hooks/mutations/strategy/useCreateStrategyMutation';
import useForm from '@hooks/shared/useForm';
import { Error } from '@models/error.model';
import { StrategyValues } from '@models/strategy.model';
import { TextField, Button } from '@mui/material';
import { initialValuesStrategy } from '@utils/constants/marketingStrategy.constants';
import { groupErrorMessages } from '@utils/errors';
import { marketingStrategy } from '@utils/validations/strategy';
import { DateTime } from 'luxon';
import { ChangeEvent, useState } from 'react';

// TODO: Slot input
// TODO: Complete this component
function CreateStrategy() {
  const { valuesForm, handleInputChange, resetForm } = useForm(initialValuesStrategy);
  const {
    description = '',
    fromSchedule = DateTime.now(),
    toSchedule = DateTime.now().plus({ weeks: 1 }),
  } = valuesForm;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mutation = createStrategyMutation();
  const [errorsForm, setErrorsForm] = useState(initialValuesStrategy);

  const handleErrorFormat = (errorFormat: StrategyValues) => setErrorsForm(errorFormat);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePublish = () => {
    const { success = false, error = null } = marketingStrategy.safeParse(valuesForm);

    if (!success) {
      const formatErrors =
        error?.issues
          ?.map(({ message, path }: Error) => ({ message, path }))
          .filter((error): error is { message: string; path: string[] } => error !== undefined) || [];

      handleErrorFormat(groupErrorMessages(formatErrors) as unknown as StrategyValues);
      return;
    }

    //mutation.mutate(uploadStrategyAdapter(valuesForm));
    // TODO: Mutation
    resetForm(initialValuesStrategy);
  };

  return (
    <div>
      <TextField
        id="outlined"
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
        value={description}
        inputProps={{ name: 'description' }}
        error={Boolean(errorsForm.description)}
        helperText={errorsForm.description}
        label="Descripcion"
        variant="outlined"
        fullWidth
      />
      <DateRangeValue fromSchedule={fromSchedule} toSchedule={toSchedule} handleInputChange={handleInputChange} />

      <Button variant="contained">Publish</Button>
    </div>
  );
}

export default CreateStrategy;