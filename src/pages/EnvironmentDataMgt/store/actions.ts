import { get } from 'lodash'
import { runInAction } from 'mobx'

import * as API from '@/api/environmentDataMgt'
import type { EnvironmentDataPayload } from '@/api/environmentDataMgt'
import Store from './store'

export default class Actions {
  private _store: Store
  constructor(store: Store) {
    this._store = store
  }

  async getEnvironmentData(payload?: EnvironmentDataPayload) {
    await API.getEnvironmentDataByType(payload || this._store.filters).then((res) => {
      if (res) {
        runInAction(() => {
          this._store.environmentTableData = get(res, ['data', 'list'], []).map((d: object, index: number) => {
            const rowData = { ...d, orderNum: index + 1 }
            return rowData
          })
        })
      }
    })
  }
}
