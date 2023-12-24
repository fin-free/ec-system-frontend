import { useContext, useEffect, useState } from 'react'

import SearchInput from '@/components/SearchInput'
import Tree from '@/components/Tree'
import { observer, useStore } from '@/hooks/storeHook'
import { TreeNode } from '@/types'

import storeContext from '../context'

import Styles from './EquipmentList.module.scss'

const EquipmentList = () => {
  const {
    commonStore: { buildingList, defaultSelectedBuildingKeys, defaultExpandBuildingKeys }
  } = useStore()
  const { actions } = useContext(storeContext)
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [autoExpandParent, setAutoExpandParent] = useState(true)

  useEffect(() => {
    setExpandedKeys(defaultExpandBuildingKeys)
    setSelectedKeys(defaultSelectedBuildingKeys)
    actions.setSelectedBuildingId(defaultSelectedBuildingKeys[0])
  }, [defaultExpandBuildingKeys, defaultSelectedBuildingKeys])

  const dataList: { key: React.Key; title: string }[] = []
  const generateList = (data: TreeNode[]) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i]
      const { key, title } = node
      dataList.push({ key, title: title as string })
      if (node.children) {
        generateList(node.children)
      }
    }
  }

  generateList(buildingList)
  const getParentKey = (key: React.Key, tree: TreeNode[]): React.Key => {
    let parentKey: React.Key
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i]
      if (node.children) {
        if (node.children.some((item) => item.key === key)) {
          parentKey = node.key
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children)
        }
      }
    }
    return parentKey!
  }

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys)
    setAutoExpandParent(false)
  }

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const newExpandedKeys = dataList
      .map((item) => {
        if (item.title && typeof item.title === 'string' && item.title.indexOf(value) > -1) {
          return getParentKey(item.key, buildingList)
        }
        return null
      })
      .filter((item, i, self): item is React.Key => !!(item && self.indexOf(item) === i))
    setExpandedKeys(newExpandedKeys)
    setSearchValue(value)
    setAutoExpandParent(true)
  }

  const loop = (data: TreeNode[]): TreeNode[] =>
    data.map((item) => {
      const strTitle = item.title as string
      const index = strTitle.indexOf(searchValue)
      const beforeStr = strTitle.substring(0, index)
      const afterStr = strTitle.slice(index + searchValue.length)
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span style={{ color: 'red' }}>{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{strTitle}</span>
        )

      if (item.children) {
        return { title, key: item.key, children: loop(item.children) }
      }

      return {
        title,
        key: item.key
      }
    })

  const treeData = loop(buildingList)

  const onSelect = (keys: React.Key[], e: any) => {
    if (!e.selected) {
      setSelectedKeys([e.node.key])
      return
    }

    setSelectedKeys(keys)
    const selectedBuildId = keys[0].toString()
    actions.setSelectedBuildingId(selectedBuildId)
    actions.getEnvironmentData(selectedBuildId)
  }

  return (
    <aside className={Styles.root}>
      <SearchInput rootClassName='search-input' onChange={onSearch} placeholder='输入名称搜索...' />
      <Tree
        onExpand={onExpand}
        autoExpandParent={autoExpandParent}
        expandedKeys={expandedKeys}
        selectedKeys={selectedKeys}
        treeData={treeData}
        onSelect={onSelect}
      />
    </aside>
  )
}

export default observer(EquipmentList)
