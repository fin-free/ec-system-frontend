import { useContext } from 'react'

import { Table } from 'antd'
import dayjs from 'dayjs'

import { observer } from '@/hooks/storeHook'

import storeContext from '../context'

import Styles from './DataTable.module.scss'

const DataTable: React.FC = () => {
  const {
    actions,
    store: { loading, environmentTableData, pagination }
  } = useContext(storeContext)

  const renderCollectStatus = (val: number) => {
    switch (val) {
      case 0:
        return '未采集'
      case 1:
        return '采集成功'
      case 2:
        return '采集失败'
    }
  }

  const columns = [
    { title: '序号', dataIndex: 'orderNum', width: 100 },
    { title: '回路名称', dataIndex: 'equipmentName' },
    { title: '设备地址', dataIndex: 'equipmentNum' },
    {
      title: '冻结时间',
      dataIndex: 'dataItemValueTime',
      render: (val: string) => dayjs(val).format('YYYY-MM-DD HH:mm:ss')
    },
    { title: '温度(℃)', dataIndex: 'temperature' },
    { title: '湿度(%rh)', dataIndex: 'humidity' },
    { title: '采集状态', dataIndex: 'collectStatus', render: renderCollectStatus }
  ]

  return (
    <Table
      size='small'
      loading={loading}
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
