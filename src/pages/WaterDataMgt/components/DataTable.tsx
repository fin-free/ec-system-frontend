import { useContext } from 'react'

import { Table } from 'antd'

import { observer } from '@/hooks/storeHook'

import storeContext from '../context'

import Styles from './DataTable.module.scss'

const DataTable: React.FC = () => {
  const {
    actions,
    store: { environmentTableData, pagination }
  } = useContext(storeContext)

  const columns = [
    { title: '序号', dataIndex: 'orderNum', width: 100 },
    { title: '回路名称', dataIndex: 'equipmentName' },
    { title: '设备地址', dataIndex: 'equipmentNum' },
    { title: '冻结时间', dataIndex: 'dataItemValueTime' },
    { title: '用水总量', dataIndex: 'dataItemValue' },
    { title: '倍率', dataIndex: 'dataItemValueOne' },
    { title: '采集状态', dataIndex: 'collectStatus' }
  ]

  return (
    <Table
      className={Styles.root}
      columns={columns}
      dataSource={environmentTableData}
      pagination={pagination}
      onChange={({ current, pageSize }) => {
        actions.updatePagination({ current: current as number, pageSize: pageSize as number })
      }}
    />
  )
}

export default observer(DataTable)
