// App.js - it has all the routings to each URL '/', '/paletteId', '/paletteId/colorId'

// Component structure by page (each number means a page)
// 1) PaletteList.js ) MiniPalette.js
// 2) -> (Page Change) -> Palette.js ) Navbar.js/ColorBox.js/footer
// 3) -> (Page Change) -> SingleColorPalette.js ) Navbar.js/ColorBox.js/footer  * this page connected to 2)

// Props by Component ()
// PaletteList : seedColor from App.js
// MiniPalette.js : colors, paletteName, emoji from 'seedColor prop' from PaletteList.js
// Palette.js : colors, paletteName, emoji, id from 'findPalette prop' from App.js
// SingleColorPalette.js : loadedPalette(fn) from 'loadedPalette prop' from App.js > then, it runs it's own logic to get shades
// Navbar.js :

import { Component } from "react";
import "./App.css";
import Palette from "./Palette";
import seedColorsfromFakeDB from "./seedColors";
import { generatePalette } from "./colorHelpers";
import { Switch, Route } from "react-router-dom";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPalette from "./NewPalette";
import Test from "./Test";

//just routing here..? PaletteList component to be rendered via Route
//In the child components, it accesses all the route below by using Link from 'react-router-dom'
class App extends Component {
  constructor(props) {
    super(props);
    //load fake DB first and.. save it into a variable? then.. check the variable to see if it has data?..? no.. not this way

    // const setData = localStorage.setItem('colorDB', JSON.stringify(seedColorsfromFakeDB));
    const getData = JSON.parse(localStorage.getItem("colorDB"));

    this.state = {
      seedColors: getData || seedColorsfromFakeDB,
    };
    this.findPalette = this.findPalette.bind(this);
    this.addPalette = this.addPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
    this.syncLocalStorage = this.syncLocalStorage.bind(this);
  }

  findPalette(paletteId) {
    const filteredArray = this.state.seedColors.filter(
      (data) => data.id === paletteId
    )[0];
    // console.log(' filtered: ', filteredArray);
    return generatePalette(filteredArray);
  }

  addPalette(newPalette) {
    console.log("hi~~ will be saved!");
    console.log("obj from down :", newPalette);
    this.setState(
      {seedColors: [...this.state.seedColors, newPalette]},
      this.syncLocalStorage
      //this.setState does not guarantee it will save data immediately.
      //It means that sycnLocalStorage() might be run before setState done.
      //To avoid this issue, setState() accepts second argument(callback).
      //Second argument will be run after setState does it's job.
      // syncLocalStorage without () in here. if with (), it runs immediately in this code.
    );
  }

  deletePalette(id) {
    // console.log("delete palette btn worked in App.js");
    console.log('paletteID from the bottom', id)
    const result = this.state.seedColors.filter(data => data.id !== id);
    console.log('filtered', result);
    this.setState({seedColors: result}, this.syncLocalStorage);
  }

  syncLocalStorage() {
    localStorage.setItem("colorDB", JSON.stringify(this.state.seedColors));
    console.log("syncLocalStorage worked");
  }

  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/newPalette"
            render={(routerProps) => (
              <NewPalette
                addPalette={this.addPalette}
                palettes={this.state.seedColors}
                {...routerProps}
              />
            )}
            //pass palettename down to.. new palette along with seedcolor?
          />
          <Route
            exact
            path="/"
            render={() => (
              <PaletteList
                seedColors={this.state.seedColors}
                deletePalette={this.deletePalette}
              />
            )}
          />
          <Route
            exact
            path="/palette/:paletteId"
            render={(routeProps) => {
              console.log("paletteId: ", routeProps.match.params.paletteId);
              return (
                <Palette
                  {...this.findPalette(routeProps.match.params.paletteId)}
                  // {...generatePalette(seedColors[routeProps.match.params.id])}
                />
              );
            }}
          />

          <Route
            exact
            path="/palette/:paletteId/:colorId"
            render={(routeProps) => {
              // const { paletteId } = routeProps.match.params;
              return (
                <SingleColorPalette
                  {...routeProps}
                  findPalette={this.findPalette}
                />
              );
            }} //pass palette with id down to Single..
          />

          <Route exact path="/test" render={() => <Test />} />
        </Switch>
      </div>
    );
  }
}

export default App;
