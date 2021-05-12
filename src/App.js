import logo from "./logo.svg";
import "./App.css";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";

function App() {
	console.log(generatePalette(seedColors[4]));
	return (
		<div>
			<Palette palette={generatePalette(seedColors[2])} />
		</div>
	);
}

export default App;
