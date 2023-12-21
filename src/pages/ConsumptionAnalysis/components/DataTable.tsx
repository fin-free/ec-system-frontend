import { useContext } from 'react'

import { Table } from 'antd'
import dayjs from 'dayjs'

import { observer } from '@/hooks/storeHook'

import storeContext from '../context'

import Styles from './DataTable.module.scss'

const DataTable: React.FC = () => {
  const {
    store: { loading, energyConsumptionTableData, filters }
  } = useContext(storeContext)

  const dataRangeLabelFormat: { [key: string]: string } = {
    '0011': 'MM-DD HH:mm',
    '0012': 'MM-DD',
    '0013': 'M'
  }
  const dataRangeLabelUnit: { [key: string]: string } = { '0011': '', '0012': '', '0013': '月' }

  const columns = [
    { title: '序号', dataIndex: 'orderNum', width: 100 },
    {
      title: '日期',
      dataIndex: 'clearingPeriod',
      render: (value: string) =>
        `${dayjs(value).format(dataRangeLabelFormat[filters.datetype])}${dataRangeLabelUnit[filters.datetype]}`
    },
    {
      title: `用量（${filters.datatype === '0002' ? 'kWh' : 'dun'}）`,
      dataIndex: 'energyValue',
      render: (value: number) => value || '--'
    },
    { title: '占比', dataIndex: 'proportion' }
  ]

  return (
    <Table
      loading={loading}
      size='small'
      className={Styles.root}
      columns={columns}
      dataSource={energyConsumptionTableData}
      pagination={{ pageSize: 15 }}
    />
  )
}

export default observer(DataTable)
