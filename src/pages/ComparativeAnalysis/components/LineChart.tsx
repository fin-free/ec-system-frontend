import { useContext } from 'react'

import dayjs from 'dayjs'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { observer } from '@/hooks/storeHook'

import storeContext from '../context'

const ConsumptionChart: React.FC = () => {
  const { store } = useContext(storeContext)
  const { energyComparativeChartNowData = [], energyComparativeCharYoyQoqData = [], filters } = store

  const dataRangeLabelFormat: { [key: string]: string } = { '0011': 'HH', '0012': 'MM-DD', '0013': 'M' }
  const dataRangeLabelUnit: { [key: string]: string } = { '0011': '小时', '0012': '', '0013': '月' }

  const options = {
    chart: {
      type: 'spline',
      backgroundColor: 'transparent'
    },
    title: {
      text: ''
    },
    plotOptions: {
      spline: {
        shadow: false,
        color: '#3e3e8e'
      },
      series: {
        dataLabels: {
          enabled: true,
          style: {
            color: '#ffffff'
          }
        }
      }
    },
    legend: {
      itemStyle: {
        color: '#ffffff'
      }
    },
    xAxis: {
      categories: energyComparativeChartNowData.map((d) => d.clearingPeriod),
      labels: {
        style: {
          color: 'white'
        },
        formatter: function (value: any) {
          return `${dayjs(value.value).format(dataRangeLabelFormat[filters.datetype])}${
            dataRangeLabelUnit[filters.datetype]
          }`
        }
      }
    },
    yAxis: {
      title: {
        text: '',
        style: {
          color: '#e8e8e8'
        }
      },
      labels: {
        style: {
          color: 'white'
        }
      }
    },
    series: [
      { name: '本期', data: energyComparativeChartNowData.map((d) => d.energyValue) },
      {
        name: filters.yoyOrQoq === 'yoy' ? '同比' : '环比',
        data: energyComparativeCharYoyQoqData.map((d) => d.energyValue)
      }
    ],
    credits: { enabled: false }
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />
}

export default observer(ConsumptionChart)
