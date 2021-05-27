import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import Slider from "rc-slider";
import styles from "./styles/NavBarStyles";
import "rc-slider/assets/index.css";

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.handleFormatChange =
			this.handleFormatChange.bind(this);
		this.closeSnackbar = this.closeSnackbar.bind(this);
		this.state = { format: "hex", open: false };
	}

	handleFormatChange(event) {
		this.setState({
			format: event.target.value,
			open: true,
		});
		this.props.handleChange(event.target.value);
	}
	closeSnackbar() {
		this.setState({ open: false });
	}

	render() {
		const {
			level,
			changeLevel,
			showingAllColors,
			classes,
		} = this.props;
		const { format } = this.state;
		return (
			<header className={classes.Navbar}>
				<div className={classes.logo}>
					<Link to="/">ReactColorPicker</Link>
				</div>
				{/* ---------------------Color shade slider -------------------------------- */}
				{showingAllColors && (
					<div>
						<span>{level}</span>

						<div className={classes.slider}>
							<Slider
								defaultValue={level}
								min={100}
								max={900}
								step={100}
								onAfterChange={changeLevel}
							/>
						</div>
					</div>
				)}
				{/* ------------------------ Color Format Picker ---------------------------------------- */}
				<div className={classes.selectContainer}>
					<Select
						value={format}
						onChange={this.handleFormatChange}
					>
						<MenuItem value="hex">HEX - #ffffff </MenuItem>
						<MenuItem value="rgb">
							{" "}
							RGB - rgb(255,255,255){" "}
						</MenuItem>
						<MenuItem value="rgba">
							{" "}
							RGBA - rgba(255,255,255, 1.0){" "}
						</MenuItem>
					</Select>
				</div>
				{/* ------------------Snack Bar----------------------------------- */}
				<Snackbar
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "left",
					}}
					open={this.state.open}
					autoHideDuration={3000}
					message={
						<span id="message-id">
							Format Changed To: {format.toUpperCase()}
						</span>
					}
					ContentProps={{
						"aria-describedby": "message=id",
					}}
					onClose={this.closeSnackbar}
					action={[
						<IconButton
							onClick={this.closeSnackbar}
							color="inherit"
							key="close"
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>,
					]}
				></Snackbar>
			</header>
		);
	}
}

export default withStyles(styles)(Navbar);
