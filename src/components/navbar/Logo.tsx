import officialLogo from '@assets/logo/logo.svg';
import { Typography } from '@mui/material';

function Logo({ stylesLogoBox = {}, stylesImgLogo = {}, variantSize = 'h4' }) {
  return (
    <div style={{ ...stylesLogoBox }}>
      <div style={{ maxWidth: '200px', ...stylesImgLogo }}>
        <img src={officialLogo} alt="Logo EASYPOST IA" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>
      <Typography variant={variantSize} style={{ fontWeight: 'normal', fontStyle: 'italic' }}>
        EASYPOST IA
      </Typography>
    </div>
  );
}

export default Logo;
