import officialLogo from '@assets/logo/logo.svg';
import { Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TypographyProps } from '@mui/material/Typography';

interface LogoProps {
  stylesLogoBox?: React.CSSProperties;
  stylesImgLogo?: React.CSSProperties;
  variantSize?: TypographyProps['variant'];
}

function Logo({ stylesLogoBox = {}, stylesImgLogo = {}, variantSize = 'h4' }: LogoProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <Box onClick={handleClick} sx={{ cursor: 'pointer', ...stylesLogoBox }}>
      <div style={{ maxWidth: '200px', ...stylesImgLogo }}>
        <img src={officialLogo} alt="Logo EASYPOST IA" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>
      <Typography variant={variantSize} style={{ fontWeight: 'normal', fontStyle: 'italic' }}>
        EASYPOST IA
      </Typography>
    </Box>
  );
}

export default Logo;
