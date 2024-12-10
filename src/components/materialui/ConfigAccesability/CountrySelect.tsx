import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { countries } from '@utils/constants';
import { useAccesibilityConfig } from '@stores/useAccessibilityConfig';
import { CountryType } from '@models/zustand.model';

function CountrySelect() {
  const { country, updateCountry } = useAccesibilityConfig();

  return (
    <Autocomplete
      id="country-select"
      sx={{ width: 200 }}
      options={countries}
      value={country}
      onChange={(_, newValue: CountryType | null = countries[1]) => updateCountry(newValue ?? countries[1])}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box key={key} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...optionProps}>
            <img
              loading="lazy"
              width="20"
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              alt=""
            />
            ({option.code}) +{option.phone} / {option.lang}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            },
          }}
        />
      )}
    />
  );
}

export default CountrySelect;
