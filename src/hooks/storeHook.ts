import { useContext } from 'react'

import { observer } from 'mobx-react-lite'

import { context } from '../main'

function useStore() {
  const store = useContext(context)
  return store
}

export { observer, useStore }
