import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { Button } from "@mui/material";
import "./NewPalette.css";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

function ColorPickerArea(props) {
  const [currentColor, updateColor] = useState("");
  const [currentName, updateName] = useState(""); // used in FormValidator/when creates color //color name

  const handleSketchPickerChange = (data) => updateColor(data.hex);
  const handleColorNameValidator = (e) => updateName(e.target.value);

  const {
    clearPaltte,
    randColorBtn,
    handleSubmitOfAddColorButton,
    colorArray,
    limit,
  } = props;

  const disabled = colorArray.length >= limit;

  //FormValidator realted fn - start----------------------------------[FormValidator - start]
  useEffect(() => {
    //name validation
    ValidatorForm.addValidationRule("isNameDuplicated", (typedName) =>
      colorArray.every((data) => data.name !== typedName)
    );
    //colorCode validation
    ValidatorForm.addValidationRule("isColorDuplicated", () =>
      colorArray.every((data) => data.color !== currentColor)
    );
  });

  function handleAddBtn() {
    handleSubmitOfAddColorButton(currentColor, currentName);
    updateName("");
    updateColor();
  }

  const handleRandomBtn = () => {
    if (colorArray.length + 1 <= limit) {
      while (true) {
        const flattenedColors = props.palettes.map((d) => d.colors).flat();
        const rand = Math.floor(Math.random() * flattenedColors.length);
        const randomColor = flattenedColors[rand];
        const isDuplicated = colorArray.some(
          (c) => c.color === randomColor.color
        );

        if (!isDuplicated) {
          randColorBtn(flattenedColors[rand]);
          //  updateColorArray([...colorArray, flattenedColors[rand]]);
          console.log("randome color generated! :", flattenedColors[rand]);
          break;
        }
        console.log("color duplication detected! run again automatically");
      }
    } else {
      alert("you reached the limit");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0.5rem",
      }}
    >
      <div style={{ width: "100%" }}>
        <Button
          style={{ width: "50%" }}
          variant="contained"
          color="primary"
          onClick={clearPaltte}
        >
          CLEAR
        </Button>
        <Button
          style={{ width: "50%" }}
          variant="contained"
          color="error"
          onClick={handleRandomBtn}
          disabled={disabled}
        >
          RANDOM
        </Button>
      </div>

      <SketchPicker color={currentColor} onChange={!disabled && handleSketchPickerChange} />
      <ValidatorForm
        style={{ paddingTop: "1rem", width: "100%" }}
        onSubmit={handleAddBtn}
      >
        <TextValidator
          style={{ width: "100%" }}
          onChange={handleColorNameValidator}
          label="Input your color name"
          name="currentName"
          value={currentName}
          validators={["isNameDuplicated", "isColorDuplicated", "required"]}
          errorMessages={[
            "Existing color name :(",
            "Color code already exist",
            "Name required!",
          ]}
        />
        <Button
          variant="contained"
          style={{ backgroundColor: disabled ? 'grey' : currentColor, height: "70px" }}
          fullWidth
          type="submit"
          disabled={disabled}
        >
          <span style={{ fontWeight: "700", fontSize: "1.5rem" }}>
            ADD COLOR
          </span>
          <span style={{ fontsize: "2px" }}>({limit-colorArray.length} left)</span>
        </Button>
      </ValidatorForm>
    </div>
  );
}

export default ColorPickerArea;
