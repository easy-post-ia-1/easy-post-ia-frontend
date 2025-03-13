import { DateTime } from 'luxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Box, Typography } from '@mui/material';

interface DateRangeValueProps {
  fromSchedule: string | null;
  toSchedule: string | null;
  handleInputChange: (event: { target: { name: string; value: string | null } }) => void;
}

function DateRangeValue({
  fromSchedule = DateTime.now().toISO(),
  toSchedule = DateTime.now().plus({ weeks: 1 }).toISO(),
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
              value={fromSchedule ? DateTime.fromISO(fromSchedule) : null}
              onChange={(newValue) =>
                handleInputChange({
                  target: { name: 'fromSchedule', value: newValue?.toISO() ?? null },
                })
              }
            />
          </div>
          <div style={{ marginTop: '16px' }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              To:
            </Typography>
            <DateTimePicker
              label="To"
              value={toSchedule ? DateTime.fromISO(toSchedule) : null}
              onChange={(newValue) =>
                handleInputChange({
                  target: { name: 'toSchedule', value: newValue?.toISO() ?? null },
                })
              }
              minDateTime={fromSchedule ? DateTime.fromISO(fromSchedule) : undefined}
            />
          </div>
        </div>
      </LocalizationProvider>
    </Box>
  );
}

export default DateRangeValue;
