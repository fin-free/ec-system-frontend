import Actions from './actions'
import Store from './store'

function createStore() {
  const store = new Store()
  const actions = new Actions(store)
  return {
    store,
    actions,
  }
}

export default createStore
