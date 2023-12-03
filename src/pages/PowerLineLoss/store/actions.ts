import { get } from 'lodash'
import { runInAction } from 'mobx'

import * as API from '@/api/consumptionAnalysis'

import Store from './store'

export default class Actions {
  private _store: Store
  constructor(store: Store) {
    this._store = store
  }

  async getConsumptionData() {
    await API.getEnergyConsumptionData(this._store.filters).then((res) => {
      if (res) {
        runInAction(() => {
          this._store.energyConsumptionData = get(res, 'data', []).map((d: object, index: number) => {
            const rowData = { ...d, orderNum: index + 1 }
            return rowData
          })
        })
      }
    })
  }

  async onSearch(searchParams: {
    startTime?: string
    endTime?: string
    datetype?: string
    functiontype?: string
    archivesId?: string
  }) {
    runInAction(() => {
      this._store.filters = { ...this._store.filters, ...searchParams }
    })
    this.getConsumptionData()
  }

  updateMode(mode: string) {
    runInAction(() => {
      this._store.mode = mode
    })
  }
}
