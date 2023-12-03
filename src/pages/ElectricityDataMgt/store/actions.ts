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
    const payload = {
      ...this._store.filters,
      pageNum: this._store.pagination.current.toString(),
      pageSize: this._store.pagination.pageSize.toString()
    }
    await API.getElectricityDataByType(payload).then((res) => {
      if (res) {
        runInAction(() => {
          this._store.electricityTableData = get(res, ['data', 'list'], []).map((d: object, index: number) => {
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
    buildingId?: string
  }) {
    runInAction(() => {
      this._store.filters = { ...this._store.filters, ...searchParams }
    })
    this.getElectricityTableData()
  }

  async updatePagination(pagination: { current: number; pageSize: number }) {
    const { current, pageSize } = pagination
    runInAction(() => {
      this._store.pagination.current = current
      this._store.pagination.pageSize = pageSize
    })
    this.getElectricityTableData()
  }

  updateMode(mode: string) {
    runInAction(() => {
      this._store.mode = mode
    })
  }
}
