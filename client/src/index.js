import ReactDOM from "react-dom";
import createRoutes from "./routes";
import DmView from "components/utils/dmView";

// import * as serviceWorker from './components/serviceWorker';
// serviceWorker.unregister();

const dmView = new DmView();
const routes = createRoutes();

// Used to check DM Mode sequence. Used to access player-hidden entries.
DmView.accountability();
document.addEventListener("keydown", (event) => {
  dmView.keyPress(event.key);
});

ReactDOM.render(routes, document.getElementById("root"));
