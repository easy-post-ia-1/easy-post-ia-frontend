import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

function AddNewPost() {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'fixed', bottom: 80, right: 10 }}>
      <Fab color="primary" aria-label="add" onClick={() => navigate('/posts/-1')}>
        <AddIcon />
      </Fab>
    </div>
  );
}

export default AddNewPost;
