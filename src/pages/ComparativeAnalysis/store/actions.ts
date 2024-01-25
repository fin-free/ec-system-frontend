import { get } from 'lodash'
import { runInAction } from 'mobx'

import * as API from '@/api/comparativeAnalysis'

import Store from './store'

export default class Actions {
  private _store: Store
  constructor(store: Store) {
    this._store = store
  }

  async getComparativeData(selectedArchiveId?: string) {
    this.setLoadingState(true)
    const payload = {
      ...this._store.filters,
      archivesId: selectedArchiveId || this._store.selectedArchiveId
    }
    await API.getTimeCompareData(payload).then((res) => {
      if (res) {
        runInAction(() => {
          const { yoyOrQoq } = this._store.filters
          this._store.energyComparativeChartNowData =
            get(res, 'data', [])
              .filter((d: any) => d.type === 'now')[0]
              ?.list.map((d: any) => ({
                ...d,
                energyValue: d.energyValue === '-' ? 0 : d.energyValue,
                tooltipValue: d.energyValue === '-' ? '--' : null
              })) || []
          this._store.energyComparativeChartYoyQoqData =
            get(res, 'data', [])
              .filter((d: any) => d.type === yoyOrQoq)[0]
              ?.list.map((d: any) => ({
                ...d,
                energyValue: d.energyValue === '-' ? 0 : d.energyValue,
                tooltipValue: d.energyValue === '-' ? '--' : null
              })) || []
          this._store.energyComparativeTableData = this._store.energyComparativeChartNowData.map(
            (d: any, index: number) => {
              const { clearingPeriod, energyValue } = d
              return {
                orderNum: index + 1,
                time: clearingPeriod,
                energyValue,
                yoqTime: this._store.energyComparativeChartYoyQoqData[index]?.clearingPeriod,
                yoqEnergyValue: this._store.energyComparativeChartYoyQoqData[index]?.energyValue
              }
            }
          )
        })
      }
      this.setLoadingState(false)
    })
  }

  async exportTimeCompareData(selectedArchiveId?: string) {
    const payload = {
      ...this._store.filters,
      archivesId: selectedArchiveId || this._store.selectedArchiveId
    }
    await API.getTimeCompareData(payload).then((res) => {
      if (res) {
        console.log(res)
      }
    })
  }

  async onSearch(searchParams: {
    startTime?: string
    endTime?: string
    datetype?: string
    yoyOrQoq?: string
    datatype?: string
    archivesId?: string
  }) {
    runInAction(() => {
      this._store.filters = { ...this._store.filters, ...searchParams }
    })
    this.getComparativeData()
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
