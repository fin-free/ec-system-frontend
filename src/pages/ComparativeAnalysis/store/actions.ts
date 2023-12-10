import { get } from 'lodash'
import { runInAction } from 'mobx'

import * as API from '@/api/comparativeAnalysis'

import Store from './store'

export default class Actions {
  private _store: Store
  constructor(store: Store) {
    this._store = store
  }

  async getComparativeData() {
    await API.getTimeCompareData(this._store.filters).then((res) => {
      if (res) {
        runInAction(() => {
          const { yoyOrQoq } = this._store.filters
          // debugger
          this._store.energyComparativeChartData = get(res, 'data', []).filter((d: any) => d.type === yoyOrQoq)[0]?.list
          this._store.energyComparativeTableData = get(res, 'data', []).map((d: object, index: number) => {
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
    yoyOrQoq?: string
    datatype?: string
    archivesId?: string
  }) {
    runInAction(() => {
      this._store.filters = { ...this._store.filters, ...searchParams }
    })
    this.getComparativeData()
  }

  updateMode(mode: string) {
    runInAction(() => {
      this._store.mode = mode
    })
  }
}
