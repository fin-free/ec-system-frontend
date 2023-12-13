import { useContext } from 'react'

import { Table } from 'antd'

import { observer } from '@/hooks/storeHook'

import storeContext from '../context'

import Styles from './DataTable.module.scss'

const DataTable: React.FC = () => {
  const {
    store: { energyConsumptionTableData }
  } = useContext(storeContext)

  const columns = [
    { title: '序号', dataIndex: 'orderNum', width: 100 },
    { title: '日期', dataIndex: 'clearingPeriod' },
    { title: '用量', dataIndex: 'energyValue' },
    { title: '占比', dataIndex: 'proportion' }
  ]

  return <Table className={Styles.root} columns={columns} dataSource={energyConsumptionTableData} />
}

export default observer(DataTable)
