import * as React from 'react';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import {Box, Grid, Typography} from "@mui/material";
import axios from "axios";

const REACT_APP_SERV_URL = process.env.REACT_APP_SERV_URL

export default function Applet({applet, cookies, onUpdateApplet}) {

 const { title, description, enabled } = applet

  const GreenSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: green[300],
      '&:hover': {
        backgroundColor: alpha(green[300], theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: green[300],
    },
  }));

  const handleChange = (event) => {
    const urlChange = REACT_APP_SERV_URL + "widgets/update"
    axios.post(urlChange, {widgets: [{...applet, enabled: event.target.checked}]}, {
      headers: {
        'Authorization': cookies.get('token')
      }
    }).then((response) => {
          console.log("post", response);
          onUpdateApplet();
      })
    }

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#249BD3', borderRadius: 4, padding: '1px'}}>
      <Box sx={{ my: 3, mx: 2 }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h5" component="div" color="white">
              {title}
            </Typography>
          </Grid>
        </Grid>
        <Typography color="white" variant="body2">
          {description}
        </Typography>
      </Box>
      <Divider variant="middle" />
      <Box sx={{ m: 2 }}>
        <Grid container justifyContent="space-between" flexWrap="nowrap">
          <Grid item>
          </Grid>
          <Grid item>
            <GreenSwitch onChange={handleChange} checked={enabled} {...label} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}