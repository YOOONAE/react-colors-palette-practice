import React from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button } from "@mui/material";
import './MiniPalette.css';

const sxStyle = {
  palette: {
    bgcolor: "background.paper",
    boxShadow: 3,
    borderRadius: 2,
    p: 0.5,
    mb: 2,
    width: '100%',
    height: '100%',
  },
};

function MiniPalette(props) {
  const { colors, paletteName, id, emoji, deletePalette } = props;
//   console.log('props;', props.id)

  const miniColorBoxes = colors.map((c) => {
    return (
      <div
        style={{
          backgroundColor: `${c.color}`,
          width: "20%",
          height: "25%",
          display: "inline-block",
          fontSize: "Require font size", //to remove the bottom gap happened by 'inline-block', I put fontsize of 0 in the parent and put this here. weired.. but thanks google
        }}
        key={c.color}
      ></div>
    );
  });

  const handleDeleteBtn = (e) => {
      e.preventDefault();
      deletePalette(id);
  }

  return (
    <Box sx={sxStyle.palette} className='palette'>
      {/* <div className='deleteBtnContainer'> */}
        <DeleteIcon className='deleteBtn' onClick={handleDeleteBtn}/>
      {/* </div> */}
      <div className='miniPaletteContainer' label='miniPaletteContainer'>{miniColorBoxes}</div>
      <div className='title'>
        {paletteName}
        <span>{emoji}</span>
      </div>
    </Box>
  );
}

export default MiniPalette;
