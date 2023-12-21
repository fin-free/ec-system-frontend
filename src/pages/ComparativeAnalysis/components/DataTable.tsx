import { useContext } from 'react'

import { Table } from 'antd'
import dayjs from 'dayjs'

import { observer } from '@/hooks/storeHook'

import storeContext from '../context'

import Styles from './DataTable.module.scss'

const DataTable: React.FC = () => {
  const {
    store: { loading, energyComparativeTableData, filters }
  } = useContext(storeContext)

  const dataRangeLabelFormat: { [key: string]: string } = {
    '0011': 'YYYY-MM-DD HH:mm',
    '0012': 'YYYY-MM-DD',
    '0013': 'YYYY-M'
  }

  const columns = [
    { title: '序号', dataIndex: 'orderNum', width: 100 },
    {
      title: '本期日期',
      dataIndex: 'time',
      render: (value: string) => `${dayjs(value).format(dataRangeLabelFormat[filters.datetype])}`
    },
    { title: '本期用能', dataIndex: 'energyValue', render: (value: number) => value || '--' },
    {
      title: filters.yoyOrQoq === 'yoy' ? '同比时间' : '环比时间',
      dataIndex: 'yoqTime',
      render: (value: string) => `${dayjs(value).format(dataRangeLabelFormat[filters.datetype])}`
    },
    {
      title: filters.yoyOrQoq === 'yoy' ? '同比用能' : '环比用能',
      dataIndex: 'yoqEnergyValue',
      render: (value: number) => value || '--'
    }
  ]

  return (
    <Table
      loading={loading}
      size='small'
      className={Styles.root}
      pagination={false}
      columns={columns}
      dataSource={energyComparativeTableData}
    />
  )
}

export default observer(DataTable)
