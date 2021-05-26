import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./NavBar";
import PaletteFooter from "./PaletteFooter";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/PaletteStyles";

class SingleColorPalette extends Component {
	constructor(props) {
		super(props);
		this._shades = this.gatherShades(
			this.props.palette,
			this.props.colorId
		);
		this.state = { format: "hex" };
		this.changeFormat = this.changeFormat.bind(this);
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
	changeFormat(val) {
		this.setState({ format: val });
	}
	render() {
		const { format } = this.state;
		const { classes } = this.props;
		const { paletteName, emoji, id } = this.props.palette;
		const colorBox = this._shades.map((color) => (
			<ColorBox
				key={color.name}
				name={color.name}
				background={color[format]}
				showingFullPalette={false}
			/>
		));
		return (
			<div className={classes.Palette}>
				<Navbar
					handleChange={this.changeFormat}
					showingAllColors={false}
				/>
				<div className={classes.colors}>
					{colorBox}
					<div className={classes.goBack}>
						<Link to={`/palette/${id}`}>
							<span>Go back</span>
						</Link>
					</div>
				</div>
				<PaletteFooter
					paletteName={paletteName}
					emoji={emoji}
				/>
			</div>
		);
	}
}

export default withStyles(styles)(SingleColorPalette);
