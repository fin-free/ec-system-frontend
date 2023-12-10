import { useContext, useState } from 'react'

import SearchInput from '@/components/SearchInput'
import Tree from '@/components/Tree'
import { observer, useStore } from '@/hooks/storeHook'
import { Popover, Button, Modal } from 'antd'
import storeContext from '../context'

import Styles from './EquipmentList.module.scss'
import { TreeNode, ArchiveList } from '@/types'

const EquipmentList = () => {
  const {
    commonStore: { achieveList, rawAchieveList }
  } = useStore()
  console.log('rawAchieveList: ', rawAchieveList)
  const { actions } = useContext(storeContext)
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [autoExpandParent, setAutoExpandParent] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [clickedNode, setClickedNode] = useState()

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
    setAutoExpandParent(false)
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

  const treeData = loop(achieveList)

  const onSelect = (selectedKeys: React.Key[]) => {
    // actions.onSearch({
    //   archivesId: selectedKeys[0].toString()
    // })
  }

  const onClickAdd = () => {
    // TODO
    // const item = getAchieveItem(rawAchieveList, (clickedNode as any).key)
    actions.updateCurArchivesItem({
      parentId: (clickedNode as any).key,
      archivesLevel: 3
    })
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

  const onClickDelete = () => {
    console.log(clickedNode)
    setShowDeleteModal(true)
  }

  const handleModalOk = () => {
    actions.deleteArchives({
      archivesId: (clickedNode as any).key,
      archivesName: (clickedNode as any).title.props.children[2]
    })
    setShowDeleteModal(false)
  }

  const handleModalCancel = () => {
    setShowDeleteModal(false)
  }

  const onClickEdit = () => {
    // TODO
    actions.updateCurArchivesItem({
      key: (clickedNode as any).key,
      mode: 'edit'
    })
  }

  const onClickManage = () => {
    actions.updateSelectedArchivesId((clickedNode as any).key)
  }

  const getContent = () => (
    <div className={Styles.optionList}>
      <Button onClick={onClickAdd}>新增子档案</Button>
      <Button onClick={onClickEdit}>修改同级档案</Button>
      <Button onClick={onClickDelete}>删除档案</Button>
      <Button onClick={onClickManage}>配表</Button>
    </div>
  )

  const onClickTitle = (nodeData: any) => {
    console.log(nodeData)
    setClickedNode(nodeData)
  }

  const treeTitleRender = (nodeData: any) => {
    return (
      <Popover content={getContent()} trigger='click'>
        <div onClick={() => onClickTitle(nodeData)}>
          {nodeData.title.props.children[2]}
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
        checkable
        onExpand={onExpand}
        autoExpandParent={autoExpandParent}
        expandedKeys={expandedKeys}
        treeData={treeData}
        onSelect={onSelect}
        titleRender={treeTitleRender}
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
