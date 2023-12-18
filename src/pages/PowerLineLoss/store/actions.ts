import { runInAction } from 'mobx'

import * as API from '@/api/powerLineLoss'

import Store from './store'

export default class Actions {
  private _store: Store
  constructor(store: Store) {
    this._store = store
  }

  async getLossCompareData() {
    await API.getLossCompareData(this._store.filters).then((res) => {
      if (res) {
        runInAction(() => {
          this._store.lossCompareData = res
        })
      }
    })
  }

  async onSearch(searchParams: {
    datetime?: string
    datetype?: string
    archivesId: string
  }) {
    runInAction(() => {
      this._store.filters = { ...this._store.filters, ...searchParams }
    })
    this.getLossCompareData()
  }

  updateSelectedArchivesId(id: string) {
    this._store.selectedArchivesId = id
  }

  updateDateTypeChange(type: string) {
    runInAction(() => {
      this._store.filters.datetype = type
    })
  }

  updateDateTimeChange(date: string) {
    runInAction(() => {
      this._store.filters.datetime = date
    })
  }

  updateDataTypeChange(type: string) {
    runInAction(() => {
      this._store.filters.datatype = type
    })
  }
}
