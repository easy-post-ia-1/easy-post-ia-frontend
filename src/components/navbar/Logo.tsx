import officialLogo from '@assets/logo/logo.svg';
import { Typography } from '@mui/material';

function Logo() {
  return (
    <div style={{ maxWidth: '200px', width: '100%' }}>
      <img src={officialLogo} alt="Logo EASYPOST IA" style={{ maxWidth: '100%', height: 'auto' }} />
      <Typography variant="h4" style={{ fontWeight: 'normal', fontStyle: 'italic' }}>
        EASYPOST IA
      </Typography>
    </div>
  );
}

export default Logo;
