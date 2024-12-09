import { useNavbarOptions } from '@hooks/options';
import { Box, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography } from '@mui/material';
import { MouseEvent, useState } from 'react';

function ProfileAvatar() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { profileOptions } = useNavbarOptions();

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {profileOptions.map(({ id, name, onClick }) => (
          <MenuItem key={id} onClick={() => onClick()}>
            <Typography sx={{ textAlign: 'center' }}>{name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default ProfileAvatar;
