import * as React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

function InfoDialog(props) {
    const { onClose, open } = props;
  
    return (
      <Dialog onClose={onClose} open={open}>
        <DialogTitle><b>How does it work ?</b></DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <b>ARea</b> use the principle <b>If This Then That</b>, and it's the best way to integrate apps, devices, and services. 
            We help devices, services, and apps work together in new and powerful ways.
          </Typography>
          <Typography gutterBottom>
            <br/><b>ARea</b> was founded on the belief that every thing works better together. 
            Tech incompatibility has become challenging for anyone trying to build a smart home or create automatic routines in their life. 
            <b>ARea</b> makes it easy.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose}>
            I got it !
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  
  InfoDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };

export default InfoDialog;