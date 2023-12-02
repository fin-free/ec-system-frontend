import { useContext } from 'react'

import { Table } from 'antd'

import { observer } from '@/hooks/storeHook'

import storeContext from '../context'

import Styles from './DataTable.module.scss'

const DataTable: React.FC = () => {
  const {
    store: { environmentTableData }
  } = useContext(storeContext)

  const columns = [
    { title: '序号', dataIndex: 'orderNum', width: 100 },
    { title: '回路名称', dataIndex: 'name' },
    { title: '采集时间', dataIndex: 'date' },
    { title: '电压(V)', dataIndex: 'voltage' }
  ]

  return <Table className={Styles.root} columns={columns} dataSource={environmentTableData} />
}

export default observer(DataTable)
