import dayjs from 'dayjs'
import { get } from 'lodash'
import { runInAction } from 'mobx'
import { Md5 } from 'ts-md5'

import * as API from '@/api/login'
import { AUTH_TOKEN_EXPIRE, AUTH_TOKEN_KEY, AUTH_TOKEN_SAVE_TIME } from '@/common/constants/auth'
import { ILoginParams } from '@/types'

import AuthStore from '../modules/authStore'

export default class AuthActions {
  private _authStore: AuthStore
  constructor(authStore: AuthStore) {
    this._authStore = authStore
  }

  async init() {
    if (localStorage.getItem(AUTH_TOKEN_KEY)) {
      return API.getUserInfo().then((res) => {
        const userInfo = get(res, 'data', {})

        runInAction(() => {
          if (userInfo.projectId) {
            userInfo['projectId'] = userInfo['projectId'].toString()
          }
          this._authStore.setUserInfo(userInfo)
        })

        return userInfo
      })
    }
  }

  async toLogin(param: ILoginParams) {
    const { userName, password } = param
    if (!userName && !password) return false

    return API.login({ userName, password: Md5.hashStr(password).toString() })
      .then((response) => {
        if (response && response.code === 200) {
          const { token, expire } = get(response, 'data', {})
          localStorage.setItem(AUTH_TOKEN_KEY, `${token}`)
          localStorage.setItem(AUTH_TOKEN_SAVE_TIME, dayjs().valueOf().toString())
          localStorage.setItem(AUTH_TOKEN_EXPIRE, `${expire}`)

          this.init()
          return true
        }
        return false
      })
      .catch((e) => {
        console.log('toLogin throw error: ' + e)
        return false
      })
  }

  async toLogout(targetUrl: string) {
    API.loginOut().then(() => {
      localStorage.clear()
      window.location.href = targetUrl
    })
  }
}
