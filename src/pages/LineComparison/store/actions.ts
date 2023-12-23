import { runInAction } from 'mobx'

import * as API from '@/api/lineComparison'

import Store from './store'

interface SearchParams {
  archivesIds: any
  projectId: string
  datetype: string
  datatype: string
  startTime: string
  endTime: string
}
export default class Actions {
  private _store: Store
  constructor(store: Store) {
    this._store = store
  }

  async getLineComparisonData(selectedArchiveIds?: string[]) {
    this.setLoadingState(true)
    const payload = {
      ...this._store.filters,
      archivesId: selectedArchiveId || this._store.selectedArchiveId
    }
    await API.getLineComparisonData(payload).then((res) => {
      if (res) {
        runInAction(() => {
          this._store.energyConsumptionChartData = get(res, 'data', [])
          this._store.energyConsumptionTableData = get(res, 'data', []).map((d: object, index: number) => {
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
    datetype?: string
    datatype?: string
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

  setSelectedArchiveId(id: string) {
    runInAction(() => {
      this._store.selectedArchiveId = id
    })
  }

  setLoadingState(loading: boolean) {
    runInAction(() => {
      this._store.loading = loading
    })
  }

  async onSearch(archivesIds: string[]) {
    this.getLineComparisonData({ archivesIds })
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

  updateDataType(type: string) {
    this._store.filters.datatype = type
  }

  updateDateType(type: string) {
    this._store.filters.datetype = type
  }
  updateCheckedArchivesIds(ids: string[]) {
    this._store.filters.archivesIds = ids
  }
}
