import { useContext } from 'react'

import dayjs from 'dayjs'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { observer } from '@/hooks/storeHook'

import storeContext from '../context'

const ConsumptionChart: React.FC = () => {
  const { store } = useContext(storeContext)
  const { lineComparisonChartData, filters } = store

  const dataRangeLabelFormat: { [key: string]: string } = {
    '0011': 'MM-DD HH:mm',
    '0012': 'MM-DD',
    '0013': 'M'
  }
  const dataRangeLabelUnit: { [key: string]: string } = { '0011': '', '0012': '', '0013': '月' }

  const options = {
    chart: {
      type: 'spline',
      backgroundColor: 'transparent'
    },
    title: {
      text: filters.datatype === '0002' ? '用电线路对比（kWh）' : '用水线路对比（t）',
      align: 'left',
      style: {
        fontSize: 14,
        color: '#d8d8d8'
      }
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: false
        },
        lineWidth: 0.5
      },
      series: {
        dataLabels: {
          enabled: false
        }
      }
    },
    tooltip: {
      shared: true,
      formatter: function (this: any) {
        return this.points.reduce(
          (pre: string, cur: any) => {
            return `${pre}<p style="font-weight:bold;"><br><br>${cur.point.tooltipName}</p>
          <p>${cur.point.tooltipValue ? cur.point.tooltipValue : cur.y} ${
              filters.datatype === '0002' ? 'kWh' : 't'
            }</p>`
          },
          `<p style="font-weight:bold;">时间:</p>
        <p>
          ${dayjs(this.x).format(dataRangeLabelFormat[filters.datetype])}
        </p><b><br><br>${filters.datatype === '0002' ? '用能' : '用水'}:</b>`
        )
      }
    },
    legend: {
      itemStyle: {
        color: '#d8d8d8'
      }
    },
    xAxis: {
      categories: lineComparisonChartData[0]?.list.map((d) => d.clearingPeriod),
      tickInterval: filters.datetype === '0013' ? 1 : filters.datetype === '0012' ? 5 : 3,
      lineColor: '#3e3e3e',
      labels: {
        style: {
          color: '#d8d8d8'
        },
        formatter: function (value: any) {
          return `${dayjs(value.value).format(dataRangeLabelFormat[filters.datetype])}${
            dataRangeLabelUnit[filters.datetype]
          }`
        }
      }
    },
    yAxis: {
      gridLineColor: '#3e3e3e',
      title: {
        text: ''
      },
      labels: {
        style: {
          color: '#d8d8d8'
        }
      }
    },
    series: lineComparisonChartData?.map((data) => {
      return {
        name: data.archivesName,
        data: data?.list?.map((d) => ({
          y: d.energyValue === '-' ? 0 : d.energyValue,
          tooltipName: data.archivesName,
          tooltipValue: d.energyValue === '-' ? '--' : null
        }))
      }
    }),
    credits: { enabled: false }
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />
}

export default observer(ConsumptionChart)
