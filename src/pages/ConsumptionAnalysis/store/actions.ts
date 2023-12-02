import { get } from 'lodash'
import { runInAction } from 'mobx'

import * as API from '@/api/electricityDataMgt'

import Store from './store'

export default class Actions {
  private _store: Store
  constructor(store: Store) {
    this._store = store
  }

  async getElectricityTableData() {
    // await API.getElectricityDataByType().then((res) => {
    //   if (res) {
    //     runInAction(() => {
    //       this._store.electricityTableData = get(res, 'data', []).map((d: object, index: number) => {
    //         const rowData = { ...d, orderNum: index + 1 }
    //         return rowData
    //       })
    //     })
    //   }
    // })
  }
}
