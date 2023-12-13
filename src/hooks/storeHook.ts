import { useContext } from 'react'

import { observer } from 'mobx-react-lite'

import storeContext from '@/contexts/storeContext'

function useStore() {
  const store = useContext(storeContext)
  return store
}

export { observer, useStore }
