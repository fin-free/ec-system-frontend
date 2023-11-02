import { get, isNil } from 'lodash'

import * as API from '@/api/login'
import { AUTH_TOKEN_KEY } from '@/common/constants/auth'

import AuthStore from '../modules/authStore'

interface ILoginParams {
  userName: string
  password: string
}

export default class AuthActions {
  private _authStore: AuthStore
  constructor(authStore: AuthStore) {
    this._authStore = authStore
  }

  async init(): Promise<void> {
    if (!isNil(localStorage.getItem(AUTH_TOKEN_KEY))) {
      this.getUserInfo()
    }
  }

  async getUserInfo() {
    await API.getUserInfo().then((res) => {
      if (res) {
        const userInfo = get(res, ['data'])
        this._authStore.setUserInfo(userInfo)
      }
    })
  }

  async toLogin(param: ILoginParams) {
    const { userName, password } = param
    if (!userName && !password) return false

    return API.login({ userName, password })
      .then((res: object) => {
        if (res) {
          const token = get(res, 'data')
          localStorage.setItem(AUTH_TOKEN_KEY, `${token}`)
        }

        return this.init().then(() => {
          return true
        })
      })
      .catch((e) => {
        console.log('toLogin throw error: ' + e)
        return false
      })
  }
}
