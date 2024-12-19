import { DateTime } from 'luxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Box, Typography } from '@mui/material';

interface DateRangeValueProps {
  fromSchedule: DateTime | null;
  toSchedule: DateTime | null;
  handleInputChange: (event: { target: { name: string; value: DateTime | null } }) => void;
}

function DateRangeValue({
  fromSchedule = DateTime.now(),
  toSchedule = DateTime.now().plus({ weeks: 1 }),
  handleInputChange = () => {},
}: DateRangeValueProps) {
  return (
    <Box sx={{ my: 4 }}>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <div>
          <div>
            <Typography variant="body1" sx={{ mb: 2 }}>
              From:
            </Typography>
            <DateTimePicker
              label="From"
              value={fromSchedule}
              onChange={(newValue) => handleInputChange({ target: { name: 'fromSchedule', value: newValue } })}
            />
          </div>
          <div style={{ marginTop: '16px' }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              To:
            </Typography>
            <DateTimePicker
              label="To"
              value={toSchedule}
              onChange={(newValue) => handleInputChange({ target: { name: 'toSchedule', value: newValue } })}
              minDateTime={fromSchedule || undefined}
            />
          </div>
        </div>
      </LocalizationProvider>
    </Box>
  );
}

export default DateRangeValue;
