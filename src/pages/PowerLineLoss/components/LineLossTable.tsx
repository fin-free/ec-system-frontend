import { useContext } from 'react'

import { Table } from 'antd'

import { observer } from '@/hooks/storeHook'

import storeContext from '../context'

import Styles from './LineLossTable.module.scss'

import { LossCompareItem } from '../types'

const LineLossTable: React.FC = () => {
  const {
    store: { loading, treeLossCompareData }
  } = useContext(storeContext)

  const mapTableData = (root: LossCompareItem) => {
    if (!root) return {}
    let newRoot = {} as any
    newRoot.archivesId = root.archivesId
    newRoot.archivesName = root.archivesName
    newRoot.loseRateValue = root.loseRateValue
    newRoot.loseValue = root.loseValue
    newRoot.subEnergyValue = root.subEnergyValue
    newRoot.key = root.archivesId
    newRoot.children = root.childrenList?.map((child: any) => {
      return mapTableData(child)
    })
    return newRoot
  }

  console.log('treeLossCompareData: ', treeLossCompareData)

  const columns = [
    { title: '名称', dataIndex: 'archivesName' },
    { title: '能耗', dataIndex: 'energyValue' },
    { title: '下级能耗', dataIndex: 'subEnergyValue' },
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
    />
  )
}

export default observer(LineLossTable)
