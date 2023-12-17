import { useContext } from 'react'

import dayjs from 'dayjs'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { observer } from '@/hooks/storeHook'

import storeContext from '../context'

const ConsumptionChart: React.FC = () => {
  const { store } = useContext(storeContext)
  const { energyConsumptionChartData, filters } = store

  const dataRangeLabelFormat: { [key: string]: string } = { '0011': 'HH', '0012': 'MM-DD', '0013': 'M' }
  const dataRangeLabelUnit: { [key: string]: string } = { '0011': 'h', '0012': '', '0013': '月' }

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
      enabled: false
    },
    xAxis: {
      categories: energyConsumptionChartData.map((d) => d.clearingPeriod),
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
        text: 'kWh',
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
    series: [{ name: '能耗', data: energyConsumptionChartData.map((d) => d.energyValue) }],
    credits: { enabled: false }
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />
}

export default observer(ConsumptionChart)
