import { makeAutoObservable } from 'mobx'

export default class CommonStore {
  constructor() {
    makeAutoObservable(this)
  }

  public showLoading = false

  public setShowLoading(val: boolean) {
    this.showLoading = val
  }
}
