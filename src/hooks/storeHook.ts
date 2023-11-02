import React, { useContext } from 'react'

import { observer } from 'mobx-react-lite'

import { IStore } from '@/store'

const storeContext = React.createContext({} as IStore)

function useStore() {
  const store = useContext(storeContext)
  return store
}

export { observer, useStore }
