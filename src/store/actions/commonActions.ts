import Store from '../modules/commonStore'
import { get } from 'lodash'
import { optionTypes } from '@/common/constants/index'
import { DictItem, TreeNode, BuildList, ArchiveList } from '@/types'

import API from '@/api/commonApis'

export default class CommonActions {
  private _store: Store
  constructor(commonStore: Store) {
    this._store = commonStore
  }

  async init() {
    this.getDictList()
    this.getAchieveList('1')
    this.getBuildingList('1')
  }

  async getDictList() {
    Promise.all([
      API.getDictList({ dictType: optionTypes.DataType }),
      API.getDictList({ dictType: optionTypes.EnergyType }),
      API.getDictList({ dictType: optionTypes.AlarmType }),
      API.getDictList({ dictType: optionTypes.FunctionType })
    ]).then((res) => {
      if (res) {
        this._store.dataTypeOptions = this.transformDictToOption(get(res, [0, 'data'], []))
        this._store.energyTypeOptions = this.transformDictToOption(get(res, [1, 'data'], []))
        this._store.alarmTypeOptions = this.transformDictToOption(get(res, [2, 'data'], []))
        this._store.functionTypeOptions = this.transformDictToOption(get(res, [3, 'data'], []))
      }
    })
  }

  async getAchieveList(projectId: string) {
    API.getAchieveList({ projectId }).then((res) => {
      if (res) {
        const treeData: Array<TreeNode> = []
        this.transformAchieveListToTree(get(res, 'data', []), treeData)
        this._store.achieveList = treeData
      }
    })
  }

  async getBuildingList(projectId: string) {
    API.getBuildingList({ projectId }).then((res) => {
      if (res) {
        const treeData: Array<TreeNode> = []
        this.transformBuildingListToTree(get(res, 'data', []), treeData)
        this._store.buildingList = treeData
      }
    })
  }

  transformDictToOption(dictData: DictItem[]) {
    return dictData.map((d) => {
      return {
        key: d.dictValue,
        label: d.dictLabel,
        value: d.dictValue
      }
    })
  }

  transformAchieveListToTree(listData: ArchiveList, treeData: Array<TreeNode>) {
    listData.forEach((d) => {
      const { archivesName, archivesId, childrenList } = d
      const node: TreeNode = { key: `${archivesId}`, title: archivesName }
      treeData.push(node)

      if (childrenList) {
        node.children = []
        this.transformAchieveListToTree(childrenList, node.children)
      }
    })
  }

  transformBuildingListToTree(listData: BuildList, treeData: Array<TreeNode>) {
    listData.forEach((d) => {
      const { buildingName, buildingId, childrenList } = d
      const node: TreeNode = { key: `${buildingId}`, title: buildingName }
      treeData.push(node)

      if (childrenList) {
        node.children = []
        this.transformBuildingListToTree(childrenList, node.children)
      }
    })
  }
}
