import dayjs from 'dayjs'
import { makeAutoObservable } from 'mobx'

export default class Store {
  constructor() {
    makeAutoObservable(this)
  }

  public mode = 'table'
  public filters = {
    projectId: '1',
    datetype: '0011',
    energyid: '0002',
    datetime: dayjs().format('YYYY-MM-DD HH:mm:ss')
  }
  public lossCompareData = []

  get treeLossCompareData() {
    function mapLossToTreeData(lossData: Array<any>) {
      return lossData?.length > 0
        ? lossData.map((root) => {
            const newRoot = {} as any
            newRoot.id = String(root.archivesId)
            newRoot.label = root.archivesName
            newRoot.children = mapLossToTreeData(root.childrenList)
            return newRoot
          })
        : []
    }
    return mapLossToTreeData(this.lossCompareData)
  }
}
