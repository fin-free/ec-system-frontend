import { saveAs } from 'file-saver'
import { runInAction } from 'mobx'

import * as API from '@/api/lineComparison'

import Store from './store'

interface SearchParams {
  archivesIds: number[]
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

  async getLineComparisonData(archivesIds?: number[]) {
    this.setLoadingState(true)
    const payload = {
      projectId: this._store.projectId,
      ...this._store.filters,
      archivesIds: archivesIds || this._store.selectedArchiveIds
    }

    if (payload.archivesIds.length === 0) {
      runInAction(() => {
        this._store.lineComparisonChartData = [] as any
      })
      return
    }
    await API.getLineComparisonData(payload).then((res) => {
      if (res) {
        runInAction(() => {
          this._store.lineComparisonChartData = res
        })
        this.setLoadingState(false)
      }
    })
  }

  async exportComparisonData() {
    const payload = {
      projectId: this._store.projectId,
      ...this._store.filters,
      archivesIds: this._store.selectedArchiveIds
    }
    await API.exportLineComparisonData(payload).then((res: any) => {
      if (res) {
        const blob = new Blob([res], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
        saveAs(blob, 'data.xlsx')
      }
    })
  }

  async onSearch(searchParams: Partial<SearchParams>) {
    runInAction(() => {
      this._store.filters = { ...this._store.filters, ...searchParams }
    })
    this.getLineComparisonData()
  }

  updateMode(mode: string) {
    runInAction(() => {
      this._store.mode = mode
    })
  }

  setSelectedArchiveIds(ids: number[]) {
    runInAction(() => {
      this._store.selectedArchiveIds = ids
    })
  }

  updateDataType(type: string) {
    runInAction(() => {
      this._store.filters.datatype = type
    })
  }

  updateDateType(type: string) {
    runInAction(() => {
      this._store.filters.datetype = type
    })
  }

  setLoadingState(loading: boolean) {
    runInAction(() => {
      this._store.loading = loading
    })
  }
}
