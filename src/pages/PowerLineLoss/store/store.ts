import dayjs from 'dayjs'
import { computed, makeAutoObservable } from 'mobx'

import { LossCompareItem } from '../types'

export default class Store {
  constructor() {
    makeAutoObservable(this, {
      treeLossCompareData: computed
    })
  }

  public mode = 'chart'
  public loading = true
  public filters = {
    projectId: '1',
    datetype: '0012',
    datetime: dayjs().add(-1, 'day').format('YYYY-MM-DD HH:mm:ss'), // 默认取昨天
    datatype: '0002'
  }
  public lossCompareData: LossCompareItem[] = []

  public selectedArchivesId = ''

  get treeLossCompareData() {
    function getData(lossData: LossCompareItem[], archivesId: string): LossCompareItem[] | null {
      for (const data of lossData) {
        if (data.archivesId === Number(archivesId)) {
          return [data]
        }
        const res = getData(data.childrenList, archivesId)
        if (res) {
          return res
        }
      }
      return null
    }
    if (this.selectedArchivesId) {
      return getData(this.lossCompareData, this.selectedArchivesId) || this.lossCompareData
    }
    return this.lossCompareData
  }
}
