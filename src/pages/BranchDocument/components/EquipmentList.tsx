import { useContext, useEffect, useState } from 'react'

import SearchInput from '@/components/SearchInput'
import Tree from '@/components/Tree'
import { observer, useStore } from '@/hooks/storeHook'
import { Popover, Button, Modal } from 'antd'
import storeContext from '../context'

import Styles from './EquipmentList.module.scss'
import { TreeNode, ArchiveList, RawTreeNode } from '@/types'
import { NodeData } from '../types'

const EquipmentList = () => {
  const {
    commonStore: { achieveList, rawAchieveList, defaultExpandAchieveKeys },
    commonActions
  } = useStore()
  const { store, actions } = useContext(storeContext)
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [showPopoverNodeKey, setShowPopoverNodeKey] = useState<number | null>()
  // const [autoExpandParent, setAutoExpandParent] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedNode, setSelectedNode] = useState<NodeData>()
  const [treeArchivesData, setTreeArchivesData] = useState<ArchiveList>()

  const dataList: { key: React.Key; title: string }[] = []

  useEffect(() => {
    setExpandedKeys(defaultExpandAchieveKeys)
  }, [defaultExpandAchieveKeys])
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

  useEffect(() => {
    setTreeArchivesData(loop(rawAchieveList))
  }, [rawAchieveList])

  useEffect(() => {
    const handler = () => {
      setShowPopoverNodeKey(null)
    }
    window.addEventListener('click', handler)
    return () => {
      window.removeEventListener('click', handler)
    }
  }, [])

  generateList(achieveList)
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
    // setAutoExpandParent(false)
  }

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const newExpandedKeys = dataList
      .map((item) => {
        if (
          item.title &&
          typeof item.title === 'string' &&
          item.title.indexOf(value) > -1
        ) {
          return getParentKey(item.key, achieveList)
        }
        return null
      })
      .filter(
        (item, i, self): item is React.Key =>
          !!(item && self.indexOf(item) === i)
      )
    setExpandedKeys(newExpandedKeys)
    setSearchValue(value)
    // setAutoExpandParent(true)
  }

  const loop = (data: RawTreeNode[]): TreeNode[] =>
    data.map((item) => {
      const strTitle = item.archivesName as string
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

      if (item.childrenList) {
        return {
          title,
          key: String(item.archivesId),
          children: loop(item.childrenList),
          ...item,
          childrenList: undefined
        }
      }

      return {
        title,
        key: String(item.archivesId),
        ...item
      }
    })

  const onSelect = (
    selectedKeys: string[],
    e: { selected: boolean; selectedNodes: NodeData[]; node: NodeData }
  ) => {
    if (e.selectedNodes[0]) {
      setSelectedNode(e.selectedNodes[0])
      actions.updateSelectedNode(e.selectedNodes[0])
    }
  }

  const getAchieveItem = (list: ArchiveList, key: string): any => {
    for (const item of list) {
      if (String(item.archivesId) === String(key)) {
        return item
      }
      if (item.childrenList) {
        const res = getAchieveItem(item.childrenList, key)
        if (res) {
          return res
        }
      }
    }
    return null
  }

  const onClickAdd = () => {
    actions.updateCurArchivesItem({
      parentId: selectedNode?.archivesId,
      parentName: selectedNode?.archivesName,
      archivesLevel: selectedNode?.archivesLevel
    })
  }

  const onClickDelete = () => {
    setShowDeleteModal(true)
  }

  const onClickEdit = () => {
    actions.updateCurArchivesItem({
      archivesName: selectedNode?.archivesName,
      archivesLevel: selectedNode?.archivesLevel,
      parentId: selectedNode?.parentId,
      parentName: selectedNode?.parentName,
      archivesId: selectedNode?.archivesId
    })
  }

  const onClickManage = () => {
    // actions.updateSelectedArchivesId(selectedNode?.archivesId as number)
    actions.updateTreeMode('manage')
  }

  const handleModalOk = async () => {
    const res = await actions.deleteArchives({
      archivesId: selectedNode?.archivesId,
      archivesName: selectedNode?.archivesName
    })
    commonActions.getAchieveList('1')
    setShowDeleteModal(false)
    setSelectedNode(undefined)
  }

  const handleModalCancel = () => {
    setShowDeleteModal(false)
  }

  const getContent = () =>
    store.treeMode === 'manage' ? null : (
      <div className={Styles.optionList}>
        <Button onClick={onClickAdd}>新增子档案</Button>
        <Button onClick={onClickEdit}>修改档案</Button>
        <Button onClick={onClickDelete}>删除档案</Button>
        <Button onClick={onClickManage}>配表</Button>
      </div>
    )

  const onRightClickNode = (e: any, nodeData: NodeData) => {
    e.preventDefault()
    setShowPopoverNodeKey(nodeData.archivesId)
    setSelectedNode(nodeData)
    actions.updateSelectedNode(nodeData)
  }

  const treeTitleRender = (nodeData: NodeData) => {
    return (
      <Popover
        content={getContent()}
        open={showPopoverNodeKey === nodeData.archivesId}
      >
        <div onContextMenu={(e) => onRightClickNode(e, nodeData)}>
          {nodeData.archivesName}
        </div>
      </Popover>
    )
  }

  return (
    <aside className={Styles.root}>
      <SearchInput
        rootClassName='search-input'
        onChange={onSearch}
        placeholder='输入名称搜索...'
      />
      <Tree
        treeData={treeArchivesData}
        onSelect={onSelect}
        titleRender={treeTitleRender}
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        selectedKeys={[String(selectedNode?.archivesId)]}
      />
      <Modal
        title='确认删除档案'
        open={showDeleteModal}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        是否删除档案？
      </Modal>
    </aside>
  )
}

export default observer(EquipmentList)
