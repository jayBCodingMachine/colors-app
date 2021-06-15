import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NeWPaletteForm from "./NewPaletteForm";
import "./App.css";
import Palette from "./Palette";
import SingleColorPalette from "./SingleColorPalette";
import PaletteList from "./PaletteList";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { palettes: seedColors };
		this.savePalette = this.savePalette.bind(this);
		this.findPalette = this.findPalette.bind(this);
	}

	findPalette(id) {
		return this.state.palettes.find(function (palette) {
			return palette.id === id;
		});
	}

	savePalette(newPalette) {
		this.setState({
			palettes: [...this.state.palettes, newPalette],
		});
	}

	render() {
		return (
			<Switch>
				<Route
					exact
					path="/palette/new"
					render={(routeProps) => (
						<NeWPaletteForm
							savePalette={this.savePalette}
							{...routeProps}
						/>
					)}
				></Route>
				<Route
					exact
					path="/"
					render={(routeProps) => (
						<PaletteList
							palettes={this.state.palettes}
							{...routeProps}
						/>
					)}
				/>
				<Route
					exact
					path="/palette/:id"
					render={(routeProps) => (
						<Palette
							palette={generatePalette(
								this.findPalette(routeProps.match.params.id)
							)}
						/>
					)}
				/>
				<Route
					path="/palette/:palettId/:colorId"
					render={(routeProps) => (
						<SingleColorPalette
							colorId={routeProps.match.params.colorId}
							palette={generatePalette(
								this.findPalette(
									routeProps.match.params.palettId
								)
							)}
						/>
					)}
				/>
			</Switch>
			// <div>
			// 	<Palette palette={generatePalette(seedColors[1])} />
			// </div>
		);
	}
}

export default App;
