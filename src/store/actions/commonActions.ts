import Store from '../modules/commonStore'
import { flattenDeep, get } from 'lodash'
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
      API.getDictList({ dictType: optionTypes.DateType }),
      API.getDictList({ dictType: optionTypes.EnergyType }),
      API.getDictList({ dictType: optionTypes.AlarmType }),
      API.getDictList({ dictType: optionTypes.FunctionType })
    ]).then((res) => {
      if (res) {
        this._store.dateTypeOptions = this.transformDictToOption(
          get(res, [0, 'data'], [])
        )
        this._store.energyTypeOptions = this.transformDictToOption(
          get(res, [1, 'data'], [])
        )
        this._store.alarmTypeOptions = this.transformDictToOption(
          get(res, [2, 'data'], [])
        )
        this._store.functionTypeOptions = this.transformDictToOption(
          get(res, [3, 'data'], [])
        )
      }
    })
  }

  async getAchieveList(projectId: string) {
    API.getAchieveList({ projectId }).then((res) => {
      if (res) {
        const treeData: Array<TreeNode> = []
        this.transformAchieveListToTree(get(res, 'data', []), treeData)
        this._store.rawAchieveList = get(res, 'data', [])
        this._store.achieveList = treeData
        this._store.defaultSelectedAchieveKeys = this.getAllKeys(treeData)
      }
    })
  }

  async getBuildingList(projectId: string) {
    API.getBuildingList({ projectId }).then((res) => {
      if (res) {
        const treeData: Array<TreeNode> = []
        this.transformBuildingListToTree(get(res, 'data', []), treeData)
        this._store.buildingList = treeData
        this._store.defaultSelectedBuildingKeys = this.getAllKeys(treeData)
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
      const node: TreeNode = {
        key: `${archivesId}`,
        title: archivesName,
        selectable: !childrenList || childrenList.length === 0
      }
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
      const node: TreeNode = {
        key: `${buildingId}`,
        title: buildingName,
        selectable: !childrenList || childrenList.length === 0
      }
      treeData.push(node)

      if (childrenList) {
        node.children = []
        this.transformBuildingListToTree(childrenList, node.children)
      }
    })
  }

  getAllKeys(treeData: Array<TreeNode>): Array<string> {
    const nestedKeys = treeData.map((treeNode) => {
      let childKeys: Array<string> = []
      if (treeNode.children) {
        childKeys = this.getAllKeys(treeNode.children)
      }

      return [childKeys, treeNode.key]
    })

    return flattenDeep(nestedKeys)
  }
}
