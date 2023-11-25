import { makeAutoObservable } from 'mobx'

import { ActiveTab } from '@/types'

export default class CommonStore {
  constructor() {
    makeAutoObservable(this)
  }

  public showLoading = false
  public activeTabs: ActiveTab[] = [
    { key: 'key-1', name: '统计看板' },
    { key: 'key-2', name: '电力数据查询' }
  ]

  public setShowLoading(val: boolean) {
    this.showLoading = val
  }
}
