import React, { Component } from "react";
import "rc-slider/assets/index.css"; //이게 먼저와야.. 커스텀 오버라이드.. 가능
import Slider from "rc-slider";
import "./Navbar.css";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

import { Link } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { type: "hex", open: false };
    this.handleSelector = this.handleSelector.bind(this);
    this.handleSnackbar = this.handleSnackbar.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  handleSelector(e) {
    this.setState({ type: e.target.value });
    this.props.changeFormat(e.target.value);
    this.handleSnackbar();
  }

  handleSnackbar() {
    this.setState({ open: true });
  }

  closeSnackbar(e) {
    this.setState({ open: false });
  }

  render() {
    const { level, handleSlide, showSlider } = this.props;
    // console.log("Navbar", this.props);

    return (
      <div className="Navbar">
        <div className="Logo">
          <span>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <h2>Palette Project</h2>
            </Link>
          </span>
        </div>

        {showSlider && (
          <>
            <span className="Level">Level : {level}</span>
            <div className="Slider">
              <Slider
                value={level}
                min={100}
                max={800}
                step={100}
                onChange={handleSlide}
              />
            </div>
          </>
        )}

        <div className="Select-container">
          <FormControl fullWidth variant="filled" size="small">
            <InputLabel id="demo-simple-select-label">Color</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.type}
              label="Age"
              onChange={this.handleSelector}
            >
              <MenuItem value="hex">HEX - #ffffff</MenuItem>
              <MenuItem value="rgb">rgb(255,255,255)</MenuItem>
              <MenuItem value="rgba">rgba(255,255,255, 1.0)</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Snackbar
          open={this.state.open}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          onClose={this.closeSnackbar}
          message="Foramt Changed"
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={this.closeSnackbar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </div>
    );
  }
}

export default Navbar;
