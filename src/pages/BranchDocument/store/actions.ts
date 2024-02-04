import { runInAction } from 'mobx'

import * as API from '@/api/branchDocument'

import { NodeData } from '../types'

import Store from './store'

export default class Actions {
  private _store: Store
  constructor(store: Store) {
    this._store = store
  }

  async onSearch() {} // searchParams: { datetime?: string; datetype?: string }
  async getEnergyList(params?: any) {
    const res = await API.getEnergyList({
      projectId: this._store.projectId,
      ...this._store.filter,
      archivesId: this._store.selectedNode?.archivesId,
      ...params
    })
    runInAction(() => {
      this._store.energyEquipmentData = res
    })
  }

  async saveArchivesEquipmentRelation(params: { archivesId: number; meterIdList: number[]; energyType: string }) {
    const res = await API.saveArchivesEquipmentRelation(params)
    return res
  }

  async deleteArchives(params: any) {
    const res = await API.deleteArchive({ ...params, projectId: this._store.projectId })
    if (res) {
      return res
    } else {
      return null
    }
  }

  async addArchives(params: any) {
    const res = await API.addArchive({ ...params, projectId: this._store.projectId })
    if (res) {
      return res
    } else {
      return null
    }
  }

  async updateArchive(params: any) {
    const res = await API.updateArchive({ ...params, projectId: this._store.projectId })
    if (res) {
      return res
    } else {
      return null
    }
  }

  updateEnergyType(type: string) {
    runInAction(() => {
      this._store.filter.datatype = type
    })
    this.getEnergyList()
  }

  updateSelectedArchivesId(id: number) {
    runInAction(() => {
      this._store.selectedArchiveId = id
    })
  }

  updateFilterInput(value: string) {
    this._store.equipmentInput = value
  }

  updateCurArchivesItem(item: any) {
    this._store.curArchivesItem = item
  }

  updateTreeMode(mode: string) {
    runInAction(() => {
      this._store.treeMode = mode
    })
  }

  updateSelectedNode(node: NodeData | undefined) {
    runInAction(() => {
      this._store.selectedNode = node
    })
  }
}
