import { saveAs } from 'file-saver'
import { get } from 'lodash'
import { runInAction } from 'mobx'

import * as API from '@/api/consumptionAnalysis'

import Store from './store'

export default class Actions {
  private _store: Store
  constructor(store: Store) {
    this._store = store
  }

  async getConsumptionData(selectedArchiveId?: string) {
    this.setLoadingState(true)
    const payload = {
      projectId: this._store.projectId,
      ...this._store.filters,
      archivesId: selectedArchiveId || this._store.selectedArchiveId
    }
    await API.getEnergyConsumptionData(payload).then((res) => {
      if (res) {
        runInAction(() => {
          this._store.energyConsumptionChartData = get(res, 'data', []).map((d: any) => ({
            ...d,
            energyValue: d.energyValue === '-' ? 0 : d.energyValue,
            tooltipValue: d.energyValue === '-' ? '--' : null
          }))
          this._store.energyConsumptionTableData = get(res, 'data', []).map((d: object, index: number) => {
            const rowData = { ...d, orderNum: index + 1 }
            return rowData
          })
        })
      }
      this.setLoadingState(false)
    })
  }

  async exportConsumptionData() {
    const payload = {
      projectId: this._store.projectId,
      ...this._store.filters,
      archivesId: this._store.selectedArchiveId
    }
    await API.exportEnergyConsumptionData(payload).then((res: any) => {
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
}
