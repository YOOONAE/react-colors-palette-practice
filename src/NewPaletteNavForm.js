import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
//custom import by me
import { Button } from "@mui/material";
import "./NewPalette.css";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import ModalSavePalette from "./DialogSavePalette";
//react-router-dom
import { Link } from "react-router-dom";

//AppBar
import { drawerWidth } from "./NewPalette";
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function NewPaletteNavForm(props) {
  //   const [paletteName, updatePaletteName] = useState("");

  const { open, handleDrawerOpen, colorArray, palettes, addPalette } = props;

  //   useEffect(() => {
  //     ValidatorForm.addValidationRule(
  //       "isPaletteNameDuplicated",
  //       (typedPaletteName) =>
  //         palettes.every((data) => data.paletteName.toLowerCase() !== typedPaletteName.toLowerCase())
  //     );
  //   });

  //   const handlePaletteNameValidator = (e) => updatePaletteName(e.target.value);

  //Save Palette Button
  //   const handleSubmitOfSavePaletteButton = () => {
  //     //bring paletteNames from seedColors down to here as props
  //     //then, validate the paletteName to see if it's not duplicated.
  //     //And, if okay, save all the data here into a new palette which will be saved in seedColors

  //     const newPalette = {
  //       paletteName: paletteName,
  //       id: paletteName,
  //       emoji: "🎨",
  //       colors: colorArray,
  //     };

  //     addPalette(newPalette);
  //     props.history.push("/"); //after saving palette, move to PaletteList !
  //   };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="inherit">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Create A NEW PALETTE! :)
            </Typography>
          </div>

          <div style={{display:'flex', flexWrap:'wrap'}}>
            <ModalSavePalette
              palettes={palettes}
              history={props.history}
              colorArray={colorArray}
              addPalette={addPalette}
            />
            <Button variant="outlined" color="primary" style={{width: '150px', marginLeft:'3px'}}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                Go Back
              </Link>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NewPaletteNavForm;
