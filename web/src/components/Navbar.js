import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Add } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import {useNavigate} from 'react-router-dom';
import Area from "../resources/logoArea.png"
import InfoIcon from '@mui/icons-material/Info';
import InfoDialog from "./InfoDialog"
import ConfigDialog from "./ConfigDialog"
import ServiceDialog from "./ServiceDialog"

export default function NavBar({cookies, onUserLogout, onCreateApplet }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [setMobileMoreAnchorEl] = React.useState(null);
  const [openInfo, setOpenInfo] = React.useState(false);
  const [openConfig, setOpenConfig] = React.useState(false);
  const [openService, setServiceConfig] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleOpenInfo = () => {
    setOpenInfo(true);
  }
  const handleCloseInfo = () => {
    setOpenInfo(false);
  };
  const handleOpenConfig = () => {
    setOpenConfig(true);
  }
  const handleCloseConfig = () => {
    setOpenConfig(false);
  };
  const handleOpenService = () => {
    setServiceConfig(true);
  }
  const handleCloseService = () => {
    setServiceConfig(false);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => onUserLogout()}>Logout</MenuItem>
      <MenuItem onClick={handleOpenService}>Connection to your services</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#1454A4' }}>
        <Toolbar>
          <img src={Area} style={{ width: "100px" }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, paddingLeft: "30px" }}
          >
            Epitech 2022 Year End Project
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 2 }} />
          <Grid>
            <IconButton color="inherit" onClick={handleOpenInfo}>
              <InfoIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleOpenConfig}>
              <Add />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              justify-content="flex-end"
            >
              <AccountCircle />
            </IconButton>
          </Grid>

        </Toolbar>
      </AppBar>
      {renderMenu}
      <InfoDialog
        onClose={handleCloseInfo}
        open={openInfo} />
      <ConfigDialog
        onClose={handleCloseConfig}
        open={openConfig}
        onCreateApplet={onCreateApplet}
        cookies={cookies}/>
      <ServiceDialog
        onClose={handleCloseService}
        open={openService} />
    </Box>
  );
};
