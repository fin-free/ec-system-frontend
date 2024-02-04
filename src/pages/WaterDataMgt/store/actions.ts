import { saveAs } from 'file-saver'
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
      projectId: this._store.projectId,
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
            current: get(res, ['data', 'pageNum'], 0),
            pageSize: get(res, ['data', 'pageSize'], 15),
            showTotal: (total: number) => `共 ${total} 条数据`
          }
          this._store.waterTableData = get(res, ['data', 'list'], []).map((d: object, index: number) => {
            const rowData = { ...d, orderNum: index + 1 }
            return rowData
          })
        })
      }
      this.setLoadingState(false)
    })
  }

  async exportWaterData() {
    const payload = {
      projectId: this._store.projectId,
      ...this._store.filters,
      buildingId: this._store.selectedBuildingId,
      pageNum: this._store.pagination.current.toString(),
      pageSize: this._store.pagination.pageSize.toString()
    }
    await API.exportEnvironmentDataByType(payload).then((res: any) => {
      if (res) {
        const blob = new Blob([res], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
        saveAs(blob, 'data.xlsx')
      }
    })
  }

  async onSearch(searchParams: {
    startTime?: string
    endTime?: string
    energytype?: string
    datetype?: string
    buildingId?: string
    equipmentNum?: string
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

  updateMode(mode: string) {
    runInAction(() => {
      this._store.mode = mode
    })
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
