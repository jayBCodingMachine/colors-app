import { colors } from "@material-ui/core";
import React, { Component } from "react";
import ColorBox from "./ColorBox";

export default class SingleColorPalette extends Component {
	constructor(props) {
		super(props);
		this._shades = this.gatherShades(
			this.props.palette,
			this.props.colorId
		);
	}

	gatherShades(palette, colorToFilterBy) {
		let shades = [];
		let allColors = palette.colors;
		for (let key in allColors) {
			shades = shades.concat(
				allColors[key].filter(
					(color) => color.id === colorToFilterBy
				)
			);
		}
		return shades.slice(1);
		// return all shades of given color
	}
	render() {
		const colorBox = this._shades.map((color) => (
			<ColorBox
				key={color.id}
				name={color.name}
				background={color.hex}
				showLink={false}
			/>
		));
		return (
			<div className="Palette ">
				<h1>Single Color Palette</h1>
				<civ className="Palette-colors">{colorBox}</civ>
			</div>
		);
	}
}
