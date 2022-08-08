import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Logo } from "./../../assets/Logo-Main.svg";

import Footer from "./../footer/footer.component";
import "./navigation.styles.css";

const Navigation = () => {
  return (
    <Fragment>
      <div className="header">
        <Link className="logo-container" to="/">
          <Logo className="logo" />
        </Link>
        <nav className="main-nav">
          <ul className="main-nav-list">
            <li>
              <Link to="/login" className="main-nav-link">
                <p className="small">Sign in</p>
              </Link>
            </li>
            <li>
              <Link to="/signup" className="main-nav-link nav-cta">
                Create Account
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default Navigation;

// import * as React from "react";
// import PropTypes from "prop-types";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Divider from "@mui/material/Divider";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
// import MenuIcon from "@mui/icons-material/Menu";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";

// const drawerWidth = 240;
// const navItems = ["Login", "Signup"];

// function DrawerAppBar(props) {
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = React.useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const drawer = (
//     <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
//       <Divider />
//       <List>
//         {navItems.map((item) => (
//           <ListItem key={item} disablePadding>
//             <ListItemButton sx={{ textAlign: "center" }}>
//               <ListItemText primary={item} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   const container =
//     window !== undefined ? () => window().document.body : undefined;

//   return (
//     <Box sx={{ display: "flex" }}>
//       <AppBar component="nav" style={{ backgroundColor: "#101010" }}>
//         <Toolbar>
//           <IconButton
//             color="default"
//             aria-label="open drawer"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: "none" } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Link className="logo-container" to="/">
//             <Logo className="logo" />
//           </Link>
//           <Box sx={{ display: { xs: "none", sm: "block" } }}>
//             {navItems.map((item) => (
//               <Button key={item} sx={{ color: "#fff" }}>
//                 {item}
//               </Button>
//             ))}
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <Box component="nav">
//         <Drawer
//           container={container}
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true, // Better open performance on mobile.
//           }}
//           sx={{
//             display: { xs: "block", sm: "none" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>
//       </Box>
//       <Box component="main" sx={{ p: 3 }}>
//         <Toolbar />
//         <Outlet />
//         <Footer />
//       </Box>
//     </Box>
//   );
// }

// DrawerAppBar.propTypes = {
//   window: PropTypes.func,
// };

// export default DrawerAppBar;
