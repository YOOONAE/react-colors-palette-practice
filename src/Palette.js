import { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "./Palette.css";

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 500,
      format: "hex",
    };
    this.handleSlide = this.handleSlide.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
    // console.log(this.props);
  }

  handleSlide(value) {
    this.setState({ level: value });
    // console.log("value: ", value);
  }

  changeFormat(format) {
    // console.log("changeFormat() ::", format);
    this.setState({ format });
  }

  render() {
    const { colors, paletteName, emoji, id } = this.props;
    const { level, format } = this.state;

    const colorBoxes = colors[level].map((data) => {
      // console.log('In Palette.js - data detail: ', data)
      return <ColorBox key={data.id} color={data[format]} name={data.name} paletteId={id} colorId={data.id}/>;
    });

    // console.log('Palette.js', this.props);

    return (
      <div className="Palette">
        <Navbar
          {...this.props}
          level={level}
          showSlider={true}
          handleSlide={this.handleSlide}
          changeFormat={this.changeFormat}
        />

        <div className="Palette-Colors">{colorBoxes}</div>
        <footer className="Footer-container">
          {paletteName}
          <span>{emoji}</span>
        </footer>
      </div>
    );
  }
}

export default Palette;
