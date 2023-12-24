import { useContext, useEffect, useState } from 'react'

import { Table } from 'antd'
import dayjs from 'dayjs'

import { observer } from '@/hooks/storeHook'

import storeContext from '../context'
import { ChartData } from '../types'

import Styles from './DataTable.module.scss'

const DataTable: React.FC = () => {
  const {
    store: { lineComparisonChartData, filters }
  } = useContext(storeContext)
  const [tableData, setTableData] = useState<any>()
  const [columns, setColumns] = useState<any>()

  const dataRangeLabelFormat: { [key: string]: string } = {
    '0011': 'MM-DD HH:mm',
    '0012': 'MM-DD',
    '0013': 'M'
  }
  const dataRangeLabelUnit: { [key: string]: string } = { '0011': '', '0012': '', '0013': '月' }

  const mapDataToTableColumn = (listData: ChartData[]) => {
    return [
      { title: '序号', dataIndex: 'orderNum', width: 100 },
      {
        title: '日期',
        dataIndex: 'clearingPeriod',
        render: (value: string) =>
          `${dayjs(value).format(dataRangeLabelFormat[filters.datetype])}${dataRangeLabelUnit[filters.datetype]}`
      },
      ...listData.map((data) => {
        return {
          title: data.archivesName!,
          dataIndex: data.archivesId!
        }
      })
    ]
  }
  const mapDataToTableSource = (listData: ChartData[]) => {
    const source = new Map()
    listData.forEach((data) => {
      data.list?.forEach((d, index) => {
        if (!source.has(d.clearingPeriod)) {
          source.set(d.clearingPeriod, {
            clearingPeriod: d.clearingPeriod,
            [String(data.archivesId)]: d.energyValue ?? '--',
            orderNum: index + 1
          })
        } else {
          source.set(d.clearingPeriod, {
            ...source.get(d.clearingPeriod),
            [String(data.archivesId)]: d.energyValue ?? '--'
          })
        }
      })
    })
    return Array.from(source.values())
  }

  useEffect(() => {
    setColumns(mapDataToTableColumn(lineComparisonChartData))
    setTableData(mapDataToTableSource(lineComparisonChartData))
  }, [lineComparisonChartData])

  return <Table size='small' className={Styles.root} columns={columns} dataSource={tableData} pagination={false} />
}

export default observer(DataTable)
