import { makeAutoObservable } from 'mobx'

import { UserInfo } from '@/types'

export default class AuthStore {
  constructor() {
    makeAutoObservable(this)
  }

  public userInfo: UserInfo = {}

  setUserInfo(data: UserInfo) {
    this.userInfo = data
  }
}
