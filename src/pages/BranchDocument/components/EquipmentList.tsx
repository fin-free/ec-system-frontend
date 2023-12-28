import { useContext, useEffect, useState } from 'react'
import {
  EditOutlined,
  FileAddOutlined,
  DeleteOutlined,
  DashboardOutlined
} from '@ant-design/icons'
import SearchInput from '@/components/SearchInput'
import Tree from '@/components/Tree'
import { observer, useStore } from '@/hooks/storeHook'
import { Popover, Button, Modal, message, Tooltip } from 'antd'
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
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedNode, setSelectedNode] = useState<NodeData>()
  const [treeArchivesData, setTreeArchivesData] = useState<TreeNode[]>()

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
    selectedKeys: React.Key[],
    e: { selected: boolean; selectedNodes: any[]; node: any }
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

  const onClickAdd = (nodeData: NodeData) => {
    setSelectedNode(nodeData)
    actions.updateTreeMode('add')
    actions.updateCurArchivesItem({
      parentId: nodeData?.archivesId,
      parentName: nodeData?.archivesName,
      archivesLevel: nodeData?.archivesLevel
    })
  }

  const onClickDelete = () => {
    setShowDeleteModal(true)
  }

  const onClickEdit = (nodeData: NodeData) => {
    setSelectedNode(nodeData)
    actions.updateTreeMode('edit')
    actions.updateCurArchivesItem({
      archivesName: nodeData?.archivesName,
      archivesLevel: nodeData?.archivesLevel,
      parentId: nodeData?.parentId,
      parentName: nodeData?.parentName,
      archivesId: nodeData?.archivesId
    })
  }

  const onClickManage = (nodeData: NodeData) => {
    setSelectedNode(nodeData)
    // actions.updateSelectedArchivesId(selectedNode?.archivesId as number)
    actions.updateTreeMode('manage')
  }

  const handleModalOk = async () => {
    const res = await actions.deleteArchives({
      archivesId: selectedNode?.archivesId,
      archivesName: selectedNode?.archivesName
    })
    if (res?.code === 200) {
      message.success(res?.message)
      commonActions.getAchieveList('1')
      setSelectedNode(undefined)
      actions.updateSelectedNode(undefined)
    } else {
      message.error(res?.message)
    }
    setShowDeleteModal(false)
  }

  const handleModalCancel = () => {
    setShowDeleteModal(false)
  }

  const getContent = (nodeData: NodeData) =>
    store.treeMode === 'manage' ? null : (
      <div className={Styles.optionList}>
        <Tooltip title='新增子档案'>
          <Button
            icon={<FileAddOutlined />}
            onClick={() => onClickAdd(nodeData)}
          />
        </Tooltip>
        <Tooltip title='修改档案'>
          <Button
            icon={<EditOutlined />}
            onClick={() => onClickEdit(nodeData)}
          />
        </Tooltip>
        <Tooltip title='删除档案'>
          <Button icon={<DeleteOutlined />} onClick={() => onClickDelete()} />
        </Tooltip>
        <Tooltip title='配表'>
          <Button
            icon={<DashboardOutlined />}
            onClick={() => onClickManage(nodeData)}
          />
        </Tooltip>
      </div>
    )

  const onRightClickNode = (e: any, nodeData: NodeData) => {
    e.preventDefault()
    setShowPopoverNodeKey(nodeData.archivesId)
    setSelectedNode(nodeData)
    actions.updateSelectedNode(nodeData)
  }

  const treeTitleRender = (nodeData: any) => {
    return (
      <Popover
        content={getContent(nodeData)}
        // open={showPopoverNodeKey === nodeData.archivesId}
        trigger={'hover'}
        placement='right'
      >
        <div className={Styles.treeNode}>{nodeData.archivesName}</div>
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
