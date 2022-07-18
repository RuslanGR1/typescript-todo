import { withRouter } from "./withRouter";
import compose from 'compose-function'

export const withProviders = compose(withRouter)
