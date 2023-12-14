import { useContext } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import dayjs from 'dayjs'
import { observer } from '@/hooks/storeHook'
import storeContext from '../context'

const ConsumptionChart: React.FC = () => {
  const { store } = useContext(storeContext)
  const { lineComparisonDataChartData, filters } = store

  const dataRangeLabelFormat: { [key: string]: string } = {
    '0011': 'HH',
    '0012': 'MM-DD',
    '0013': 'M'
  }
  const dataRangeLabelUnit: { [key: string]: string } = {
    '0011': '小时',
    '0012': '',
    '0013': '月'
  }

  const options = {
    chart: {
      type: 'line',
      backgroundColor: '#001529'
    },
    title: {
      text: ''
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
      itemStyle: {
        color: '#ffffff'
      }
    },
    xAxis: {
      categories: lineComparisonDataChartData?.[0]?.list?.map(
        (d) => d.clearingPeriod
      ),
      labels: {
        style: {
          color: 'white'
        },
        formatter: function (value: any) {
          return `${dayjs(value.value).format(
            dataRangeLabelFormat[filters.datetype]
          )}${dataRangeLabelUnit[filters.datetype]}`
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
    series: lineComparisonDataChartData?.map((data) => {
      return {
        name: data.archivesName,
        data: data?.list?.map((d) => d.energyValue)
      }
    }),
    credits: { enabled: false }
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />
}

export default observer(ConsumptionChart)
