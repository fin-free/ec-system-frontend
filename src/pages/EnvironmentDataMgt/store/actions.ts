import { get } from 'lodash'
import { runInAction } from 'mobx'

import * as API from '@/api/environmentDataMgt'
import Store from './store'

export default class Actions {
  private _store: Store
  constructor(store: Store) {
    this._store = store
  }

  async getEnvironmentData() {
    const payload = {
      ...this._store.filters,
      pageNum: this._store.pagination.current.toString(),
      pageSize: this._store.pagination.pageSize.toString()
    }
    await API.getEnvironmentDataByType(payload).then((res) => {
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

  async onSearch(searchParams: { startTime?: string; endTime?: string; energytype?: string; datetype?: string }) {
    runInAction(() => {
      this._store.filters = { ...this._store.filters, ...searchParams }
    })
    this.getEnvironmentData()
  }

  async updatePagination(pagination: { current: number; pageSize: number }) {
    const { current, pageSize } = pagination
    runInAction(() => {
      this._store.pagination.current = current
      this._store.pagination.pageSize = pageSize
    })
    this.getEnvironmentData()
  }

  updateMode(mode: string) {
    runInAction(() => {
      this._store.mode = mode
    })
  }
}
