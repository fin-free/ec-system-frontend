import { get } from 'lodash'
import { runInAction } from 'mobx'

import * as API from '@/api/comparativeAnalysis'
import type { BuildComparePayload } from '@/api/comparativeAnalysis'

import Store from './store'

export default class Actions {
  private _store: Store
  constructor(store: Store) {
    this._store = store
  }

  async getBuildCompare(data: BuildComparePayload) {
    await API.getBuildCompareData(data).then((res) => {
      if (res) {
        runInAction(() => {
          this._store.electricityTableData = get(res, 'data', []).map((d: object, index: number) => {
            const rowData = { ...d, orderNum: index + 1 }
            return rowData
          })
        })
      }
    })
  }
}
