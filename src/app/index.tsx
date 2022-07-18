import Navigation from "../shared/ui/Navigation";
import { withProviders } from "./providers";
import { Routing } from "../pages";
import { Provider } from "react-redux";
import { setupStore } from "../store";

function App() {
  const store = setupStore();

  return (
    <Provider store={store}>
      <Navigation />
      <Routing />
    </Provider>
  );
}

export default withProviders(App);
