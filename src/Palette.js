import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./NavBar";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/PaletteStyles";
//make sure palette css comes last for slider specificity
import "./Palette.css";
import PaletteFooter from "./PaletteFooter";

class Palette extends Component {
	constructor(props) {
		super(props);
		this.state = { level: 500, format: "hex" };
		this.changeLevel = this.changeLevel.bind(this);
		this.changeFormat = this.changeFormat.bind(this);
	}

	changeLevel(level) {
		this.setState({ level });
	}

	changeFormat(val) {
		this.setState({ format: val });
	}

	render() {
		const { colors, paletteName, emoji, id } =
			this.props.palette;
		const { classes } = this.props;
		const { level, format } = this.state;
		const colorBoxes = colors[level].map((color) => {
			return (
				<ColorBox
					key={color.id}
					background={color[format]}
					name={color.name}
					moreUrl={`/palette/${id}/${color.id}`}
					showingFullPalette={true}
				/>
			);
		});

		return (
			<div className={classes.Palette}>
				<Navbar
					handleChange={this.changeFormat}
					level={level}
					changeLevel={this.changeLevel}
					showingAllColors={true}
				/>

				<div className={classes.colors}>{colorBoxes}</div>
				<PaletteFooter
					emoji={emoji}
					paletteName={paletteName}
				/>
			</div>
		);
	}
}

export default withStyles(styles)(Palette);
