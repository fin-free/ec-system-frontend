import { useContext } from 'react'

import { Table } from 'antd'

import { observer } from '@/hooks/storeHook'

import storeContext from '../context'

import Styles from './DataTable.module.scss'

const DataTable: React.FC = () => {
  const {
    store: { electricityTableData, pagination }
  } = useContext(storeContext)

  const columns = [
    { title: '序号', dataIndex: 'orderNum', width: 100 },
    { title: '回路名称', dataIndex: 'equipmentName' },
    { title: '设备地址', dataIndex: 'equipmentNum' },
    { title: '冻结时间', dataIndex: 'dataItemValueTime' },
    { title: '总', dataIndex: 'dataItemValue' },
    { title: '尖', dataIndex: 'dataItemValueOne' },
    { title: '峰', dataIndex: 'dataItemValueTwo' },
    { title: '平', dataIndex: 'dataItemValueThree' },
    { title: '谷', dataIndex: 'dataItemValueFour' },
    { title: '倍率', dataIndex: 'voltage' },
    { title: '状态', dataIndex: 'collectStatus' }
  ]

  return <Table className={Styles.root} columns={columns} dataSource={electricityTableData} pagination={pagination} />
}

export default observer(DataTable)
