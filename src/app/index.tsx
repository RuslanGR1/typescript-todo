import { Fragment } from "react";

import Navigation from "widgets/Navigation";
import { withProviders } from "./providers";
import { Routing } from "routes/mainRoute";

const App = () => (
  <Fragment>
    <Navigation />
    <Routing />
  </Fragment>
);

export default withProviders(App);
