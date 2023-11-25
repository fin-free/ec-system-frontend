import React from 'react'

import Actions from './store/actions'
import Store from './store/store'

const storeContext = React.createContext(
  {} as {
    store: Store
    actions: Actions
  }
)

export default storeContext
