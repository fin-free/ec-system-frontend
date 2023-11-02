import { makeAutoObservable } from 'mobx'

export default class AuthStore {
  constructor() {
    makeAutoObservable(this)
  }

  public userInfo: object = {}

  setUserInfo(val: object) {
    this.userInfo = val
  }
}
