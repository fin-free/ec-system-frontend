import dayjs from 'dayjs'
import { computed, makeAutoObservable } from 'mobx'

interface lossCompareItem {
  archivesId: number //档案id
  subEnergyValue: number //子级能耗值
  loseRateValue: number //线损比例值
  loseValue: number //线损值
  parentId: number //父id
  archivesName: string //档案名称
  childrenList: lossCompareItem[]
}
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
  public lossCompareData: lossCompareItem[] = []

  public selectedArchivesId = ''

  get treeLossCompareData() {
    function getData(
      lossData: lossCompareItem[],
      archivesId: string
    ): lossCompareItem[] | null {
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
      return (
        getData(this.lossCompareData, this.selectedArchivesId) ||
        this.lossCompareData
      )
    }
    return this.lossCompareData
  }
}
