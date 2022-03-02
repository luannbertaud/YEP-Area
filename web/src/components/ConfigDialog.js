import * as React from 'react';
import PropTypes from 'prop-types';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

function ConfigDialog(props) {
  const { onClose, open, onCreateApplet } = props;
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [serviceAction, setServiceAction] = React.useState('');
  const [action, setAction] = React.useState('')
  const [serviceReaction, setServiceReaction] = React.useState('');
  const [reaction, setReaction] = React.useState('')

  const actionReaction ={
    Google: {
      actions: ["Google Action 1", "Google Action 2"],
      reactions:["Google Reaction 1", "Google Reaction 2"]
    },
    Epitech: {
      actions: ["Epitech Action 1", "Epitech Action 2"],
      reactions:["Epitech Reaction 1", "Epitech Reaction 2"]
    },
    Spotify: {
      actions: ["Spotify Action 1", "Spotify Action 2"],
      reactions:["Spotify Reaction 1", "Spotify Reaction 2"]
    },
    Twitter: {
      actions: ["Twitter Action 1", "Twitter Action 2"],
      reactions:["Twitter Reaction 1", "Twitter Reaction 2"]
    },
    Discord: {
      actions: ["Discord Action 1", "Discord Action 2"],
      reactions:["Discord Reaction 1", "Discord Reaction 2"]
    },
    Github: {
      actions: ["Github Action 1", "Github Action 2"],
      reactions:["Github Reaction 1", "Github Reaction 2"]
    }
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value,)
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value,)
  }

  const handleServiceActionChange = (event) => {
    setServiceAction(event.target.value,);
  };

  const handleActionChange = (event) => {
    setAction(event.target.value,);
  };

  const handleServiceReactionChange = (event) => {
    setServiceReaction(event.target.value,);
  };

  const handleReactionChange = (event) => {
    setReaction(event.target.value,);
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
            onChange={handleTitleChange}
          />
          <TextField
            margin="dense"
            label="Description of your ARea"
            fullWidth
            variant="standard"
            onChange={handleDescriptionChange}
          />
          <FormControl sx={{ mt: 2, width: "100%"}}>
          <InputLabel htmlFor="max-width">Action Service</InputLabel>
          <Select
            value={serviceAction}
            onChange={handleServiceActionChange}
            label="Action Service"
          >
            <MenuItem value="Google">Google</MenuItem>
            <MenuItem value="Epitech">Epitech</MenuItem>
            <MenuItem value="Github">Github</MenuItem>
            <MenuItem value="Discord">Discord</MenuItem>
            <MenuItem value="Twitter">Twitter</MenuItem>
            <MenuItem value="Spotify">Spotify</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ mt: 2, width: "100%" }}>
          <InputLabel htmlFor="Action">Action</InputLabel>
          <Select
            value={action}
            onChange={handleActionChange}
            label="Action"
          >
            {serviceAction && actionReaction[serviceAction].actions.map((action, index) => <MenuItem value={action} key={index}>{action}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl sx={{ mt: 2,  width: "100%" }}>
          <InputLabel htmlFor="max-width">Reaction Service</InputLabel>
          <Select
            value={serviceReaction}
            onChange={handleServiceReactionChange}
            label="Service Reaction"
          >
            <MenuItem value="Google">Google</MenuItem>
            <MenuItem value="Epitech">Epitech</MenuItem>
            <MenuItem value="Github">Github</MenuItem>
            <MenuItem value="Discord">Discord</MenuItem>
            <MenuItem value="Twitter">Twitter</MenuItem>
            <MenuItem value="Spotify">Spotify</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ mt: 2,  width: "100%" }}>
          <InputLabel htmlFor="max-width">Reaction</InputLabel>
          <Select
            value={reaction}
            onChange={handleReactionChange}
            label="Reaction"
          >
            {serviceReaction && actionReaction[serviceReaction].reactions.map((reaction, index) => <MenuItem value={reaction} key={index}>{reaction}</MenuItem>)}
          </Select>
        </FormControl>
        </DialogContent>
       
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={() => {
              onCreateApplet({title:title, description:description}) 
              onClose()
            }}>Create</Button>
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