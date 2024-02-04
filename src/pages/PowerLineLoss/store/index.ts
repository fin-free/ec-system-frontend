import Actions from './actions'
import Store from './store'

function createStore(projectId: string) {
  const store = new Store(projectId)
  const actions = new Actions(store)
  return {
    store,
    actions
  }
}

export default createStore
