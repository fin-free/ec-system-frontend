import { useContext, useEffect, useState } from 'react'

import { Table, TableColumnType } from 'antd'

import { observer } from '@/hooks/storeHook'

import storeContext from '../context'

import Styles from './DataTable.module.scss'

import { ChartData } from '../types'
const DataTable: React.FC = () => {
  const {
    store: { lineComparisonDataChartData }
  } = useContext(storeContext)
  const [tableData, setTableData] = useState<any>()
  const [columns, setColumns] = useState<any>()

  const mapDataToTableColumn = (listData: ChartData[]) => {
    return [
      { title: '日期', dataIndex: 'clearingPeriod' },
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
            [String(data.archivesId)]: d.energyValue ?? '-',
            key: index + 1
          })
        } else {
          source.set(d.clearingPeriod, {
            ...source.get(d.clearingPeriod),
            [String(data.archivesId)]: d.energyValue ?? '-'
          })
        }
      })
    })
    return Array.from(source.values())
  }
  useEffect(() => {
    setColumns(mapDataToTableColumn(lineComparisonDataChartData))
    setTableData(mapDataToTableSource(lineComparisonDataChartData))
  }, [lineComparisonDataChartData])

  return (
    <Table className={Styles.root} columns={columns} dataSource={tableData} />
  )
}

export default observer(DataTable)
