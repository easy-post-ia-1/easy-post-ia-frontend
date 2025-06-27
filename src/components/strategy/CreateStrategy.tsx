import { uploadStrategyAdapter } from '@adapters/strategy.adapter';
import DateRangeValue from '@components/date_range/DateRangeCalendarValue';
import { createStrategyMutation } from '@hooks/mutations/strategy/useCreateStrategyMutation';
import useForm from '@hooks/shared/useForm';
import { Error } from '@models/error.model';
import { StrategyValues } from '@models/strategy.model';
import { TextField, Button, Box, Typography, Paper, Alert } from '@mui/material';
import { initialValuesStrategy } from '@utils/constants/marketingStrategy.constants';
import { groupErrorMessages } from '@utils/errors';
import { marketingStrategy } from '@utils/validations/strategy';
import { DateTime } from 'luxon';
import { ChangeEvent, useState } from 'react';

function CreateStrategy() {
  const { valuesForm, handleInputChange, resetForm } = useForm(initialValuesStrategy);
  const {
    description = '',
    fromSchedule = DateTime.now().toISO(),
    toSchedule = DateTime.now().plus({ weeks: 1 }).toISO(),
  } = valuesForm;

  const mutation = createStrategyMutation();
  const [errorsForm, setErrorsForm] = useState(initialValuesStrategy);

  const handleErrorFormat = (errorFormat: StrategyValues) => setErrorsForm(errorFormat);

  const handlePublish = () => {
    const dataToValidate = {
      ...valuesForm,
      fromSchedule:
        valuesForm.fromSchedule && typeof (valuesForm.fromSchedule as any).toISO === 'function'
          ? (valuesForm.fromSchedule as any).toISO()
          : valuesForm.fromSchedule,
      toSchedule:
        valuesForm.toSchedule && typeof (valuesForm.toSchedule as any).toISO === 'function'
          ? (valuesForm.toSchedule as any).toISO()
          : valuesForm.toSchedule,
    };

    const { success = false, error = null } = marketingStrategy.safeParse(dataToValidate);

    if (!success) {
      const formatErrors =
        error?.issues
          ?.map(({ message, path }: Error) => ({ message, path }))
          .filter((error): error is { message: string; path: string[] } => error !== undefined) || [];

      handleErrorFormat(groupErrorMessages(formatErrors) as unknown as StrategyValues);
      return;
    }

    mutation.mutate(uploadStrategyAdapter(dataToValidate));
    resetForm(initialValuesStrategy);
    setErrorsForm(initialValuesStrategy);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handlePublish();
  };

  const isFormValid = description.trim().length > 0;
  const isLoading = mutation.isPending;

  return (
    <Paper elevation={2} sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Create New Strategy
      </Typography>
      
      {mutation.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to create strategy. Please try again.
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          id="strategy-description"
          name="description"
          label="Strategy Description"
          value={description}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
          error={Boolean(errorsForm.description)}
          helperText={errorsForm.description || "Enter a description for your marketing strategy"}
          variant="outlined"
          fullWidth
          required
          multiline
          rows={3}
          sx={{ mb: 3 }}
          aria-describedby={errorsForm.description ? "description-error" : "description-help"}
        />

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Strategy Timeline
          </Typography>
          <DateRangeValue 
            fromSchedule={fromSchedule} 
            toSchedule={toSchedule} 
            handleInputChange={handleInputChange} 
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button
            type="button"
            variant="outlined"
            onClick={() => {
              resetForm(initialValuesStrategy);
              setErrorsForm(initialValuesStrategy);
            }}
            disabled={isLoading}
          >
            Reset
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!isFormValid || isLoading}
            aria-describedby={!isFormValid ? "submit-error" : undefined}
          >
            {isLoading ? 'Creating...' : 'Create Strategy'}
          </Button>
        </Box>

        {!isFormValid && (
          <Typography id="submit-error" variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
            Please fill in all required fields to create a strategy.
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

export default CreateStrategy;
