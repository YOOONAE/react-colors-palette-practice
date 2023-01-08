import Navbar from "./Navbar";
import ColorBox from "./ColorBox";
import { useState } from "react";
import "./ColorBox.css";
import { Link } from "react-router-dom";

function SingleColorPalette(props) {
  const [format, setFormat] = useState("hex");

  function changeFormat(format) {
    setFormat(format);
    console.log("FORMAT:", format);
  }

  const { paletteId, colorId } = props.match.params;
  //   console.log("params: ", props.match.params);
  const loadedPalette = props.findPalette(paletteId);
  const { paletteName, emoji } = loadedPalette;
  const _shades = [];

  for (const color in loadedPalette.colors) {
    //object iteration
    loadedPalette.colors[color].filter((data) => {
      // array iteration (filtration)
      if (data.id === colorId) {
        _shades.push(data);
      }
    });
  }
  //   console.log("routeProps from the upper component", props);

  const colorBoxes = _shades.slice(1).map((data) => {
    // console.log('In Palette.js - data detail: ', data)
    // console.log('TEST:::', data[format])
    return (
      <ColorBox
        color={data[format]}
        name={data.name}
        key={data.name}
        paletteId={paletteId}
        colorId={colorId}
      />
    ); // check if what Colorbox includes as props and pass them from here down to there
  });

  //   colorBoxes.push(<span className='Go-back'>askdjf</span>);
  //   console.log('colorBoxes', colorBoxes)
  console.log("_shaded[] : ", _shades);

  return (
    <div className="SingleColorPalette Palette">
      {/* //load 'ColorBox.css' and then update the css by adding '.SingleColorPalette .ColorBox'
    //to change the size of colorBox when you are at SingleColorPalette */}
      <Navbar
        //   {...this.props}
        //   level={level}
        //   handleSlide={this.handleSlide}
        showSlider={false}
        changeFormat={changeFormat}
      />
      <div className="Palette-Colors">
        {colorBoxes}
        <div className="ColorBox Go-back">
          <Link to={`/palette/${paletteId}`}>
            <span className="Back-btn">Back</span>
          </Link>
        </div>
      </div>

      <footer className="Footer-container">
        {paletteName}
        <span>{emoji}</span>
      </footer>
    </div>
  );
}

export default SingleColorPalette;
