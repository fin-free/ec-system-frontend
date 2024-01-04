import { useContext, useState } from 'react'

import { Table } from 'antd'

import { observer } from '@/hooks/storeHook'

import storeContext from '../context'
import { LossCompareItem } from '../types'

import Styles from './LineLossTable.module.scss'

const defaultExpandLevel = 2
const LineLossTable: React.FC = () => {
  const {
    store: { loading, treeLossCompareData }
  } = useContext(storeContext)
  const [defaultExpandedRowKeys, setDefaultExpandedRowKeys] = useState<number[]>([])

  const mapTableData = (root: LossCompareItem, level = 1) => {
    if (!root) return {}
    let newRoot = {} as any
    newRoot = root
    newRoot.key = root.archivesId
    if (level <= defaultExpandLevel) {
      defaultExpandedRowKeys.push(root.archivesId)
    }
    newRoot.children =
      root.childrenList?.length > 0
        ? root.childrenList?.map((child: any) => {
            return mapTableData(child, level + 1)
          })
        : null
    return newRoot
  }

  console.log('treeLossCompareData: ', treeLossCompareData)

  const columns = [
    { title: '名称', dataIndex: 'archivesName' },
    { title: '当前能耗', dataIndex: 'energyValue' },
    { title: '子级能耗', dataIndex: 'subEnergyValue' },
    { title: '线损', dataIndex: 'loseValue' },
    { title: '线损率', dataIndex: 'loseRateValue' }
  ]

  return (
    <Table
      loading={loading}
      size='small'
      className={Styles.table}
      columns={columns}
      dataSource={[mapTableData(treeLossCompareData[0])]}
      pagination={false}
      expandable={{
        defaultExpandedRowKeys
      }}
    />
  )
}

export default observer(LineLossTable)
