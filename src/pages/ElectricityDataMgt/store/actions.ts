import { get } from 'lodash'
import { runInAction } from 'mobx'

import * as API from '@/api/electricityDataMgt'

import Store from './store'

export default class Actions {
  private _store: Store
  constructor(store: Store) {
    this._store = store
  }

  async getElectricityTableData(buildingId?: string) {
    const payload = {
      ...this._store.filters,
      buildingId: buildingId || this._store.selectedBuildingId,
      pageNum: this._store.pagination.current.toString(),
      pageSize: this._store.pagination.pageSize.toString()
    }
    await API.getElectricityDataByType(payload).then((res) => {
      if (res) {
        runInAction(() => {
          this._store.pagination = {
            total: get(res, ['data', 'total'], 0),
            current: get(res, ['data', 'pageNumber'], 0),
            pageSize: get(res, ['data', 'pageSize'], 10),
            showTotal: (total: number) => `共 ${total} 条数据`
          }
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
    this.getElectricityTableData()
  }

  setSelectedBuildingId(id: string) {
    runInAction(() => {
      this._store.selectedBuildingId = id
    })
  }
}
