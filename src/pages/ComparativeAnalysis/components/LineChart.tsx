import { useContext } from 'react'

import dayjs from 'dayjs'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { get } from 'lodash'

import { observer } from '@/hooks/storeHook'

import storeContext from '../context'

const ConsumptionChart: React.FC = () => {
  const { store } = useContext(storeContext)
  const { energyComparativeChartNowData = [], energyComparativeChartYoyQoqData = [], filters } = store

  const dataRangeLabelFormat: { [key: string]: string } = {
    '0011': 'MM-DD HH:mm',
    '0012': 'MM-DD',
    '0013': 'M'
  }
  const dataRangeLabelUnit: { [key: string]: string } = { '0011': '', '0012': '', '0013': '月' }

  const options = {
    chart: {
      type: 'areaspline',
      backgroundColor: 'transparent'
    },
    title: {
      text:
        filters.datatype === '0002'
          ? `总用电能${filters.yoyOrQoq === 'yoy' ? '同比' : '环比'}趋势`
          : `总用水量${filters.yoyOrQoq === 'yoy' ? '同比' : '环比'}趋势`,
      align: 'left',
      style: {
        fontSize: 14,
        color: '#d8d8d8'
      }
    },
    plotOptions: {
      areaspline: {
        marker: {
          enable: true,
          fillColor: 'rgba(255,255,255,.2)',
          radius: 3
        },
        color: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, '#3e3e8e'],
            [1, 'rgba(33,33,33,.1)']
          ]
        }
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
        return `
        <p style="font-weight:bold;">时间:</p>
        <p>
          ${dayjs(this.x).format(dataRangeLabelFormat[filters.datetype])}
        </p>
        <p style="font-weight:bold;"><br><br>${filters.datatype === '0002' ? '本期能耗:' : '本期用水:'}</p>
        <p>${
          get(this.points, [0, 'point', 'tooltipValue']) && get(this.points, [0, 'y']) === 0
            ? get(this.points, [0, 'point', 'tooltipValue'])
            : get(this.points, [0, 'y'], '--')
        } ${filters.datatype === '0002' ? 'kWh' : 't'}</p>
        <p style="font-weight:bold;"><br><br>${`${filters.yoyOrQoq === 'yoy' ? '同比' : '环比'}${
          filters.datatype === '0002' ? '能耗:' : '用水:'
        }`}</p>
        <p>${
          get(this.points, [1, 'point', 'tooltipValue']) && get(this.points, [1, 'y']) === 0
            ? get(this.points, [1, 'point', 'tooltipValue'])
            : get(this.points, [1, 'y'], '--')
        } ${filters.datatype === '0002' ? 'kWh' : 't'}</p>
        `
      }
    },
    legend: {
      itemStyle: {
        color: '#d8d8d8'
      }
    },
    xAxis: {
      categories: energyComparativeChartNowData.map((d) => d.clearingPeriod),
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
        name: '本期',
        data: energyComparativeChartNowData.map((d) => ({ y: d.energyValue, tooltipValue: d.tooltipValue })),
        color: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, '#3e3e8e'],
            [1, 'rgba(0,0,0,.1)']
          ]
        }
      },
      {
        name: filters.yoyOrQoq === 'yoy' ? '同比' : '环比',
        data: energyComparativeChartYoyQoqData.map((d) => ({ y: d.energyValue, tooltipValue: d.tooltipValue })),
        color: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, '#4a71a3'],
            [1, 'rgba(0,0,0,.1)']
          ]
        }
      }
    ],
    credits: { enabled: false }
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />
}

export default observer(ConsumptionChart)
