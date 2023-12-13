import Axios from 'axios'
import dayjs from 'dayjs'
import { get } from 'lodash'
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

  async toLogin(param: ILoginParams) {
    const { userName, password } = param
    if (!userName && !password) return false

    return Axios.post('api/iot/sys/login', {
      username: userName,
      password: Md5.hashStr(password).toString()
    })
      .then((response) => {
        if (response && response.status === 200) {
          const { token, projectId, projectName, userId, expire } = get(response, ['data', 'data'])
          localStorage.setItem(AUTH_TOKEN_KEY, `${token}`)
          localStorage.setItem(AUTH_TOKEN_SAVE_TIME, dayjs().valueOf().toString())
          localStorage.setItem(AUTH_TOKEN_EXPIRE, `${expire}`)
          this._authStore.setUserInfo({ projectId, projectName, userId })
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
