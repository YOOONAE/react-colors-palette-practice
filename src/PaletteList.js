import { Button, formHelperTextClasses } from "@mui/material";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
// import { Button, Typography } from "@mui/material";
// import { margin } from "@mui/system";

const style = {
  root: {
    display: "flex",
    backgroundColor: "lightblue",
    justifyContent: "center",
    width: "100%",
    height: "100vh",
    overflow: 'scroll'
    // height:'100%',
    // position:'absolute',
    // top:'0px',
    // bottom:'0px'
    // flexDirection: 'column',
    // height: "100%",
    // alignItems: "center",
  },
  container: {
    width: "50%",
  },
  nav: {
    backgroundColor: "transparent",
    padding: "0.5rem",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
    // marginBottom: "2rem",
  },
  palette: {
    // boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "1.5rem",
  },
};

class PaletteList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { seedColors } = this.props;
    // console.log("seedColor: ", seedColors);

    return (
      <div style={style.root}>
        <div style={style.container}>
          <div style={style.nav}>
            <h1>REACT COLOR</h1>
            <Link style={{color: 'white'}} to='/newPalette'>
              <h3>Create New Palette</h3>
            </Link>
          </div>

          <div style={style.palette}>
            {seedColors.map((data) => {
                // console.log('@@@@@@@@', data.id)
              return (
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/palette/${data.id}`}
                  key={data.id}
                >
                  <MiniPalette {...data} deletePalette={this.props.deletePalette} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default PaletteList;
