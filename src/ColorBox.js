import { Component } from "react";
import "./ColorBox.css";
import CopyToClipboard from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };

    this.handleCopy = this.handleCopy.bind(this);
    this.handleMore = this.handleMore.bind(this);
  }
  
  handleCopy() {
    this.setState({ show: true }, () => {
      // alert(`Copied!`);
      setTimeout(() => this.setState({ show: false }), 1500);
    });
  }

  handleMore(e) {
    e.stopPropagation();
    //without this, color code will be copied to clipboard once clicking More button.
  }

  render() {
    const { color, name, paletteId, colorId } = this.props;
    const style = { backgroundColor: color, color: "white" };
    // console.log('ColorBox.js', this.props);

    return (
      <CopyToClipboard text={color} onCopy={this.handleCopy}>
        <div style={style} className="ColorBox">
          <div
            style={{ backgroundColor: color }}
            className={`Overlay ${this.state.show && "Show"}`}
          />

          <div className={`Overlay-msg ${this.state.show && "Show"}`}>
            <h1>Copied!</h1>
            <p>{color}</p>
          </div>

          <div>
            <span className="Box-content">{name}</span>
            <span className="Copy-btn">Copy</span>
          </div>
          <Link
            to={`/palette/${paletteId}/${colorId}`}
            style={{ textDecoration: "none", color: 'black' }}
            onClick={this.handleMore}
          >
            <span className="More-btn">More</span>
          </Link>
        </div>
      </CopyToClipboard>
    );
  }
}

export default ColorBox;
