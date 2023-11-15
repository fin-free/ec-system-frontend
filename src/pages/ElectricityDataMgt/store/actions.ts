import { get } from 'lodash'
import { runInAction } from 'mobx'

import * as API from '@/api/dashboard'

import Store from './store'

export default class Actions {
  private _store: Store
  constructor(store: Store) {
    this._store = store
  }

  async init() {
    await API.getMockData().then((res) => {
      if (res) {
        runInAction(() => {
          this._store.demoData = get(res, 'data', [])
        })
      }
    })
  }
}
