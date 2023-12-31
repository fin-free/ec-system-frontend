import { useContext } from 'react'

import dayjs from 'dayjs'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { observer } from '@/hooks/storeHook'

import storeContext from '../context'

const ConsumptionChart: React.FC = () => {
  const { store } = useContext(storeContext)
  const { energyConsumptionChartData, filters } = store

  const dataRangeLabelFormat: { [key: string]: string } = {
    '0011': 'MM-DD HH:mm',
    '0012': 'MM-DD',
    '0013': 'M'
  }
  const dataRangeLabelUnit: { [key: string]: string } = { '0011': '', '0012': '', '0013': '月' }

  const options = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent'
    },
    title: {
      text: filters.datatype === '0002' ? '总用电能(kWh)' : '总用水量(t)',
      align: 'left',
      style: {
        fontSize: 14,
        color: '#d8d8d8'
      }
    },
    plotOptions: {
      column: {
        borderColor: '',
        shadow: false,
        borderRadius: 0,
        color: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, '#3e3e8e'],
            [1, 'rgba(88,88,88,.1)']
          ]
        }
      },
      series: {
        dataLabels: {
          enabled: true,
          formatter: function (this: any) {
            return this.point.tooltipValue ? '' : this.y
          },
          style: {
            color: '#d8d8d8'
          }
        }
      }
    },
    tooltip: {
      shared: true,
      formatter: function (this: any) {
        return `
        <p style="font-weight:bold;">时间:</p>
        <p>
          ${dayjs(this.x).format(dataRangeLabelFormat[filters.datetype])}${dataRangeLabelUnit[filters.datetype]}
        </p>
        <p style="font-weight:bold;"><br><br>${filters.datatype === '0002' ? '用能' : '用水'}</p>
        <p>${this.point.tooltipValue ? this.point.tooltipValue : this.y} ${
          filters.datatype === '0002' ? 'kWh' : 't'
        }</p>`
      }
    },
    legend: {
      enabled: false
    },
    xAxis: {
      categories: energyConsumptionChartData.map((d) => d.clearingPeriod),
      tickInterval: filters.datetype === '0013' ? 1 : filters.datetype === '0012' ? 5 : 7,
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
      min: 0,
      minRange: 1,
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
    series: [
      {
        name: '能耗',
        data: energyConsumptionChartData.map((d) => ({ y: d.energyValue, tooltipValue: d.tooltipValue }))
      }
    ],
    credits: { enabled: false }
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />
}

export default observer(ConsumptionChart)
