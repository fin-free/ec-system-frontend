import { useContext } from 'react'

import { Table } from 'antd'

import { observer } from '@/hooks/storeHook'

import storeContext from '../context'

import Styles from './DataTable.module.scss'

const DataTable: React.FC = () => {
  const {
    store: { electricityTableData, filters }
  } = useContext(storeContext)

  const columns = [
    { title: '序号', dataIndex: 'orderNum', width: 100 },
    { title: '本期日期', dataIndex: 'name' },
    { title: '本期用能', dataIndex: 'date' },
    { title: filters.yoyOrQoq === 'yoy' ? '同比时间' : '环比时间', dataIndex: 'clearingPeriod' },
    { title: filters.yoyOrQoq === 'yoy' ? '同比用能' : '环比用能', dataIndex: 'energyValue' }
  ]

  return <Table className={Styles.root} columns={columns} dataSource={electricityTableData} />
}

export default observer(DataTable)
