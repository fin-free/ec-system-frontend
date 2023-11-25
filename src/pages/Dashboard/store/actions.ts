import { get } from 'lodash'
import { runInAction } from 'mobx'

import * as API from '@/api/dashboard'

import Store from './store'

export default class Actions {
  private _store: Store
  constructor(store: Store) {
    this._store = store
  }

  async getStatisticSummaryData() {
    await API.getStatisticSummary().then((res) => {
      if (res) {
        runInAction(() => {
          const data = get(res, 'data', [])

          this._store.statisticsList = data.map((d) => {
            return { key: d.title, ...d }
          })
        })
      }
    })
  }
}
