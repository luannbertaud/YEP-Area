import * as React from 'react';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import GoogleIcon from '@mui/icons-material/Google';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import TwitterIcon from '@mui/icons-material/Twitter';
import { alpha, styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import {CloseOutlined} from "@mui/icons-material";
import {Box, Grid, IconButton, Typography} from "@mui/material";

export default function Applet() {
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

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#249BD3', borderRadius: 4, padding: '1px'}}>
      <Box sx={{ my: 3, mx: 2 }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h5" component="div" color="inherit">
              Name of your ARea
            </Typography>
          </Grid>
          <IconButton
            xs={{color: 'white'}}
            >
              <CloseOutlined/>
            </IconButton>
        </Grid>
        <Typography color="text.secondary" variant="body2">
          Description of the ARea
        </Typography>
      </Box>
      <Divider variant="middle" />
      <Box sx={{ m: 2 }}>
        <Grid container justifyContent="space-between" flexWrap="nowrap">
          <Grid item>
            <GoogleIcon/>
            <ArrowRightAltIcon/>
            <TwitterIcon/>
          </Grid>
          <Grid item>
            <GreenSwitch {...label} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}