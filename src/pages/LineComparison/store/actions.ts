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

  async getLineComparisonData(searchParams: Partial<SearchParams>) {
    const payload = {
      ...this._store.filters,
      ...searchParams
    }
    if (payload.archivesIds.length === 0) {
      runInAction(() => {
        this._store.lineComparisonDataChartData = [[]] as any
      })
      return
    }
    await API.getLineComparisonData(payload).then((res) => {
      if (res) {
        runInAction(() => {
          this._store.lineComparisonDataChartData = res
        })
      }
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
