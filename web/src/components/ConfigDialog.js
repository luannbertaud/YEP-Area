import * as React from 'react';
import PropTypes from 'prop-types';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

function ConfigDialog(props) {
    const { onClose, open } = props;
    const [serviceAction, setServiceAction] = React.useState('');
    const [action, setAction] = React.useState('')
    const [serviceReaction, setServiceReaction] = React.useState('');
    const [reaction, setReaction] = React.useState('')

    const handleServiceActionChange = (event) => {
      setServiceAction(
        event.target.value,
      );
    };
    
    const handleActionChange = (event) => {
      setAction(
        event.target.value,
      );
    };

    const handleServiceReactionChange = (event) => {
      setServiceReaction(
        event.target.value,
      );
    };
    
    const handleReactionChange = (event) => {
      setReaction(
        event.target.value,
      );
    };

    return (
      <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Create your ARea</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name of your ARea"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Description of your ARea"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <FormControl sx={{ mt: 2, minWidth: 120 }}>
          <InputLabel htmlFor="max-width">Action Service</InputLabel>
            <Select
              value={serviceAction}
              onChange={handleServiceActionChange}
            >
              <MenuItem value="Google">Google</MenuItem>
              <MenuItem value="Epitech">Epitech</MenuItem>
              <MenuItem value="Github">Github</MenuItem>
              <MenuItem value="Discord">Discord</MenuItem>
              <MenuItem value="Twitter">Twitter</MenuItem>
              <MenuItem value="Spotify">Spotify</MenuItem>
            </Select>
        </FormControl>
        <FormControl sx={{ mt: 2, minWidth: 120 }}>
          <InputLabel htmlFor="max-width">Action</InputLabel>
            <Select
              value={action}
              onChange={handleActionChange}
            >
              <MenuItem value="Send a message">Send a message</MenuItem>
              <MenuItem value="Option 1">Option 1</MenuItem>
              <MenuItem value="Option 2">Option 2</MenuItem>
              <MenuItem value="Option 3">Option 3</MenuItem>
              <MenuItem value="Option 4">Option 4</MenuItem>
            </Select>
        </FormControl>
        <FormControl sx={{ mt: 2, minWidth: 120 }}>
          <InputLabel htmlFor="max-width">Reaction Service</InputLabel>
            <Select
              value={serviceReaction}
              onChange={handleServiceReactionChange}
            >
              <MenuItem value="Google">Google</MenuItem>
              <MenuItem value="Epitech">Epitech</MenuItem>
              <MenuItem value="Github">Github</MenuItem>
              <MenuItem value="Discord">Discord</MenuItem>
              <MenuItem value="Twitter">Twitter</MenuItem>
              <MenuItem value="Spotify">Spotify</MenuItem>
            </Select>
        </FormControl>
        <FormControl sx={{ mt: 2, minWidth: 120 }}>
          <InputLabel htmlFor="max-width">Reaction</InputLabel>
            <Select
              value={reaction}
              onChange={handleReactionChange}
            >
              <MenuItem value="Send a message">Send a message</MenuItem>
              <MenuItem value="Option 1">Option 1</MenuItem>
              <MenuItem value="Option 2">Option 2</MenuItem>
              <MenuItem value="Option 3">Option 3</MenuItem>
              <MenuItem value="Option 4">Option 4</MenuItem>
            </Select>
        </FormControl>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
    );
  }
  
  ConfigDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };

export default ConfigDialog;