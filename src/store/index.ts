import AuthActions from './actions/authActions'
import CommonActions from './actions/commonActions'
import AuthStore from './modules/authStore'
import CommonStore from './modules/commonStore'

export interface IStore {
  userStore: AuthStore
  commonStore: CommonStore
  authActions: AuthActions
  commonActions: CommonActions
}

export let rootStore: IStore

const createRootStore = async () => {
  const authStore = new AuthStore()
  const authActions = new AuthActions(authStore)

  const commonStore = new CommonStore()
  const commonActions = new CommonActions(commonStore)

  const rootStore = {
    authStore,
    commonStore
  }

  try {
    await authActions.init()
    commonActions.init()
  } catch (e) {
    console.log('init auth info failed : ' + e)
  }

  return rootStore
}

export default createRootStore
