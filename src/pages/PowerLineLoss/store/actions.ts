import { runInAction } from 'mobx'

import * as API from '@/api/powerLineLoss'

import { LossCompareItem } from '../types'

import Store from './store'

export default class Actions {
  private _store: Store
  constructor(store: Store) {
    this._store = store
  }

  async getLossCompareData() {
    const payload = {
      projectId: this._store.projectId,
      ...this._store.filters
    }
    await API.getLossCompareData(payload).then((res) => {
      if (res) {
        runInAction(() => {
          this._store.lossCompareData = res
          this._store.loading = false
        })
      }
    })
  }

  async onSearch(searchParams: { datetime?: string; datetype?: string; archivesId: string }) {
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

  updateMode(mode: string) {
    runInAction(() => {
      this._store.mode = mode
    })
  }

  changeNodesCollapsed(status?: boolean) {
    let treeData = [] as LossCompareItem[]
    treeData = this._store.lossCompareData.map((data) => {
      return this._traverse(data, status)
    })
    runInAction(() => {
      this._store.lossCompareData = treeData
    })
  }

  _traverse(root: LossCompareItem, collapsed?: boolean) {
    const newRoot = { ...root }
    newRoot.collapsed = collapsed
    newRoot.childrenList = root.childrenList?.map((child) => {
      return this._traverse(child, collapsed)
    })
    return newRoot
  }
}
