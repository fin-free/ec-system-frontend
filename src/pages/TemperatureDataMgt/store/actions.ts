import { get } from 'lodash'
import { runInAction } from 'mobx'

import * as API from '@/api/environmentDataMgt'

import Store from './store'

export default class Actions {
  private _store: Store
  constructor(store: Store) {
    this._store = store
  }

  async getEnvironmentData(buildingId?: string) {
    this.setLoadingState(true)
    const payload = {
      ...this._store.filters,
      buildingId: buildingId || this._store.selectedBuildingId,
      pageNum: this._store.pagination.current.toString(),
      pageSize: this._store.pagination.pageSize.toString()
    }
    await API.getEnvironmentDataByType(payload).then((res) => {
      if (res) {
        runInAction(() => {
          this._store.pagination = {
            total: get(res, ['data', 'total'], 0),
            current: get(res, ['data', 'pageNumber'], 0),
            pageSize: get(res, ['data', 'pageSize'], 10),
            showTotal: (total: number) => `共 ${total} 条数据`
          }
          this._store.environmentTableData = get(res, ['data', 'list'], []).map((d: object, index: number) => {
            const rowData = { ...d, orderNum: index + 1 }
            return rowData
          })
        })
      }
      this.setLoadingState(false)
    })
  }

  async onSearch(searchParams: {
    startTime?: string
    endTime?: string
    energytype?: string
    datetype?: string
    buildingId?: string
  }) {
    runInAction(() => {
      this._store.filters = { ...this._store.filters, ...searchParams }
    })
    this.getEnvironmentData()
  }

  async updatePagination(pagination: {
    current: number
    pageSize: number
    total?: number
    showTotal?: (total: number) => string
  }) {
    const { current, pageSize } = pagination
    runInAction(() => {
      this._store.pagination.current = current
      this._store.pagination.pageSize = pageSize
    })
    this.getEnvironmentData()
  }

  setSelectedBuildingId(id: string) {
    runInAction(() => {
      this._store.selectedBuildingId = id
    })
  }

  setLoadingState(loading: boolean) {
    runInAction(() => {
      this._store.loading = loading
    })
  }
}
