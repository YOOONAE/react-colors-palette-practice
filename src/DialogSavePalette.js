import React, { useEffect, useState } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DialogSavePalette(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [paletteName, updatePaletteName] = useState("");

  const { palettes, colorArray, addPalette } = props;

  useEffect(() => {
    ValidatorForm.addValidationRule(
      "isPaletteNameDuplicated",
      (typedPaletteName) =>
        palettes.every(
          (data) =>
            data.paletteName.toLowerCase() !== typedPaletteName.toLowerCase()
        )
    );
  });

  const handlePaletteNameValidator = (e) => updatePaletteName(e.target.value);

  const handleSubmitOfSavePaletteButton = () => {
    //bring paletteNames from seedColors down to here as props
    //then, validate the paletteName to see if it's not duplicated.
    //And, if okay, save all the data here into a new palette which will be saved in seedColors

    const newPalette = {
      paletteName: paletteName,
      id: paletteName,
      emoji: "🎨",
      colors: colorArray,
    };

    addPalette(newPalette);
    props.history.push("/"); //after saving palette, move to PaletteList !
  };

  return (
    <div>
      <Button variant="contained" color='error' onClick={handleClickOpen}>
        Save Palette
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <ValidatorForm
          style={{
            display: "flex",
            flexDirection: "column"
          }}
          onSubmit={handleSubmitOfSavePaletteButton}
        >
          <DialogTitle>Save Palette?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you finish creating your palette? If yes, save your palette!
            </DialogContentText>

            <TextValidator
            autoFocus={true}
              fullWidth
              variant="standard"
              label="Input Palette Name"
              value={paletteName}
              onChange={handlePaletteNameValidator}
              validators={["isPaletteNameDuplicated", "required"]}
              errorMessages={[
                "PalatteName duplicated! :(",
                "This filed is required",
              ]}
            />
            {/* <Button type="submit" variant="contained" color="warning" fullWidth>
              Save Palette
            </Button> */}
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={handleClose} variant='contained'>
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}
