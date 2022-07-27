import compose from 'compose-function'

import { withRouter } from "./with-router";
import { withStore } from './with-store'
import { WithDnd } from './with-dnd';

export const withProviders = compose(
    withRouter,
    withStore,
    WithDnd,
)
