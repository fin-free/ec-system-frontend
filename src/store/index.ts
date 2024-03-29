import { AUTH_TOKEN_KEY } from '@/common/constants/auth'
import { UserInfo } from '@/types/index'

import AuthActions from './actions/authActions'
import CommonActions from './actions/commonActions'
import AuthStore from './modules/authStore'
import CommonStore from './modules/commonStore'

export interface IStore {
  authStore: AuthStore
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
    authActions,
    commonStore,
    commonActions
  }

  try {
    if (localStorage.getItem(AUTH_TOKEN_KEY)) {
      authActions.init().then((userInfo: UserInfo) => commonActions.init(userInfo.projectId))
    }
  } catch (e) {
    console.log('init auth info failed : ' + e)
  }

  return rootStore
}

export default createRootStore
