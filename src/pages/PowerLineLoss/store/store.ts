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

  public mode = 'table'
  public filters = {
    projectId: '1',
    datetype: '0011',
    datetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    datatype: '0001'
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
      debugger
      return (
        getData(this.lossCompareData, this.selectedArchivesId) ||
        this.lossCompareData
      )
    }
    return this.lossCompareData
    // function mapLossToTreeData(lossData: Array<any>) {
    //   return lossData?.length > 0
    //     ? lossData.map((root) => {
    //         const newRoot = {} as any
    //         newRoot.id = String(root.archivesId)
    //         newRoot.label = root.archivesName
    //         newRoot.children = mapLossToTreeData(root.childrenList)
    //         return newRoot
    //       })
    //     : []
    // }
    // return mapLossToTreeData(this.lossCompareData)
  }
}
