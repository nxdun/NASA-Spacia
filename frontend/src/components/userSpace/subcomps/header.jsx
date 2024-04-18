import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {

    //logs out the user
    const logsOut = () => {
        window.location.href = "/logout";
    };
    
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky" sx={{ left: 0, right: 0 }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Spacia Gallery
            </Typography>
            <Button color="inherit" onClick={logsOut}>Log out</Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
};

export default Header;
