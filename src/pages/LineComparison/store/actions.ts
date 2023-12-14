import { get } from 'lodash'
import { runInAction } from 'mobx'

import * as API from '@/api/lineComparison'

import Store from './store'

export default class Actions {
  private _store: Store
  constructor(store: Store) {
    this._store = store
  }

  async getLineComparisonData(archivesIds: string[]) {
    const payload = {
      ...this._store.filters,
      archivesIds: archivesIds
    }
    await API.getLineComparisonData(payload).then((res) => {
      if (res) {
        debugger
        runInAction(() => {
          this._store.lineComparisonDataChartData = res
          this._store.lineComparisonDataTableData = res.map(
            (d: object, index: number) => {
              const columnData = { ...d, orderNum: index + 1 }
              return columnData
            }
          )
        })
      }
    })
  }

  async onSearch(archivesIds: string[]) {
    this.getLineComparisonData(archivesIds)
  }

  updateMode(mode: string) {
    runInAction(() => {
      this._store.mode = mode
    })
  }

  setSelectedArchiveId(id: string) {
    runInAction(() => {
      this._store.selectedArchiveId = id
    })
  }
}
