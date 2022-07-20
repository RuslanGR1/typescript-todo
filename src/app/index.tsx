import Navigation from "shared/ui/Navigation";
import { withProviders } from "./providers";
import { Routing } from "routes/mainRoute";
import { IframeRoute } from "routes/iframeRoute"
import { Provider } from "react-redux";
import { setupStore } from "store";

function App() {
  const store = setupStore();

  return (
    <Provider store={store}>
      <Navigation />
      <Routing />
      <IframeRoute/>
    </Provider>
  );
}

export default withProviders(App);
