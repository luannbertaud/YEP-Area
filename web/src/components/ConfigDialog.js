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
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

function ConfigDialog(props) {
  const { onClose, open, onCreateApplet, cookies } = props;
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [serviceAction, setServiceAction] = React.useState('');
  const [action, setAction] = React.useState('')
  const [serviceReaction, setServiceReaction] = React.useState('');
  const [reaction, setReaction] = React.useState('');
  const [actionContent, setActionContent] = React.useState('');
  const [reactionContent, setReactionContent] = React.useState('');

  const contentKey = { 
    "GmailSendEmail": "receiver",
    "DiscordMessage": "channel_id"
  };
  const actionReaction = {
    Google: {
      actions: [{ value: "GmailWebhook", display: "New mail on adress"}],
      reactions: [{ value: "GmailSendEmail", display: "Send email to receiver"}]
    },
    Epitech: {
      actions: [],
      reactions: []
    },
    Spotify: {
      actions: [],
      reactions: [{ value: "SpotifyNext", display: "Skip to next song" }]
    },
    Twitter: {
      actions: [],
      reactions: [{ value: "TwitterTweet", display: "Post tweet"}]
    },
    Discord: {
      actions: [],
      reactions: [{ value: "DiscordMessage", display: "Post message to channel"}]
    },
    Github: {
      actions: [{ value: "GithubWebhook", display: "New push on repository"}],
      reactions: []
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

  const displayActionContent = () => {
    if (serviceAction === "Google") {
      return (
        <TextField
          margin="dense"
          label="Content"
          fullWidth
          variant="standard"
          onChange={(event) => setActionContent(event.target.value)}
          
        />
      )
    }
  }
  const displayReactionContent = () => {
    if (serviceReaction === "Discord") {
      return (
        <TextField
          margin="dense"
          label="Content"
          fullWidth
          variant="standard"
          onChange={(event) => setReactionContent(event.target.value)}
          
        />
      )
    }
  }

  const createNewApplet = () => {
    const reactionUuid= uuidv4();
    const toSendToDaddy = {
      widgets: [
        {
          content: {
            [contentKey[reaction]]: actionContent
          },
          enabled: true,
          family: "action",
          title: title,
          description: description,
          user_uuid: "0",
          uuid: uuidv4(),
          type: action,
          children: {
            uuids: reactionUuid
          }
        },
        {
          content: {
            [contentKey[reaction]]: reactionContent
          },
          enabled: true,
          family: "reaction",
          title: "",
          description: "",
          user_uuid: "0",
          uuid: reactionUuid,
          type: reaction,
        }
      ]
    };
    console.log(toSendToDaddy);
    axios.post(
      'https://api.yep-area.cf/widgets/update',
      toSendToDaddy,
      {
        headers: {
          'Authorization': cookies.get('token')
        }
      }
    ).then((response) => {
      console.log("post", response);
      onCreateApplet({ title: title, description: description })
      onClose()
    })
  }

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
          <FormControl sx={{ mt: 2, width: "100%" }}>
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
              {
                serviceAction && actionReaction[serviceAction].actions.map(
                  (action, index) => <MenuItem value={action.value} key={index}>{action.display}</MenuItem>
                )
              }
            </Select>
            {displayActionContent()}
          </FormControl>
          <FormControl sx={{ mt: 2, width: "100%" }}>
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
          <FormControl sx={{ mt: 2, width: "100%" }}>
            <InputLabel htmlFor="max-width">Reaction</InputLabel>
            <Select
              value={reaction}
              onChange={handleReactionChange}
              label="Reaction"
            >
            {
              serviceReaction && actionReaction[serviceReaction].reactions.map(
                (reaction, index) => <MenuItem value={reaction.value} key={index}>{reaction.display}</MenuItem>
              )
            }
            </Select>
            {displayReactionContent()}
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={createNewApplet}>Create</Button>
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