import { Backdrop, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { useState } from 'react';
import { PostFabOptionsProps } from '@models/post.model';
import usePostFabPublishSaveDel from '@hooks/components/posts/usePostFabPublishSaveDel';

function PostFabOptions({ id = -1, valuesForm, handleErrorFormat }: PostFabOptionsProps) {
  const [open, setOpen] = useState(false);
  const handleOpenCloseDial = () => setOpen(!open);
  const { actions } = usePostFabPublishSaveDel({ valuesForm, id, handleErrorFormat });

  return (
    <div>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        icon={<SpeedDialIcon />}
        onClick={handleOpenCloseDial}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => action.onClick()}
          />
        ))}
      </SpeedDial>
    </div>
  );
}

export default PostFabOptions;
