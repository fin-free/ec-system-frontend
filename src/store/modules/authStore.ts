import { makeAutoObservable } from 'mobx'

import { UserInfo } from '@/types'

export default class AuthStore {
  constructor() {
    makeAutoObservable(this)
  }

  public userInfo: UserInfo = { projectId: '1' }

  setUserInfo(data: UserInfo) {
    this.userInfo = data
  }
}
