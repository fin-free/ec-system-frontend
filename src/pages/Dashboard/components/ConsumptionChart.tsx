import { useContext } from 'react'
import { Radio } from 'antd'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import dayjs from 'dayjs'
import { observer } from '@/hooks/storeHook'
import storeContext from '../context'
import Styles from './ConsumptionChart.module.scss'
import { RadioChangeEvent } from 'antd/lib'

const ConsumptionChart: React.FC = () => {
  const { store, actions } = useContext(storeContext)
  const { energyConsumptionData, energyConsumptionPayload } = store

  const chartTitleFormat: { [key: string]: string } = { '0011': 'YYYY-MM-DD', '0012': 'YYYY-MM', '0013': 'YYYY' }
  const dataRangeLabelFormat: { [key: string]: string } = { '0011': 'HH', '0012': 'MM-DD', '0013': 'M' }
  const dataRangeLabelUnit: { [key: string]: string } = { '0011': '小时', '0012': '', '0013': '月' }

  const energyOptions = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent'
    },
    title: {
      text: `能耗（${dayjs().format(chartTitleFormat[energyConsumptionPayload.datetype])}）`,
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
            color: '#d8d8d8'
          }
        }
      }
    },
    legend: {
      enabled: false
    },
    xAxis: {
      categories: energyConsumptionData.map((d) => d.clearingPeriod),
      labels: {
        style: {
          color: '#d8d8d8'
        },
        formatter: function (value: any) {
          return `${dayjs(value.value).format(dataRangeLabelFormat[energyConsumptionPayload.datetype])}${
            dataRangeLabelUnit[energyConsumptionPayload.datetype]
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
    series: [{ name: '用能', data: energyConsumptionData.map((d) => d.energyValue) }],
    credits: { enabled: false }
  }

  const wateroptions = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent'
    },
    title: {
      text: `用水（${dayjs().format(chartTitleFormat[energyConsumptionPayload.datetype])}）`,
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
      categories: energyConsumptionData.map((d) => d.clearingPeriod),
      labels: {
        style: {
          color: 'white'
        },
        formatter: function (value: any) {
          return `${dayjs(value.value).format(dataRangeLabelFormat[energyConsumptionPayload.datetype])}${
            dataRangeLabelUnit[energyConsumptionPayload.datetype]
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
    series: [{ name: '用水', data: energyConsumptionData.map((d) => d.energyValue) }],
    credits: { enabled: false }
  }

  const onChangeHandler = (e: RadioChangeEvent) => {
    switch (e.target.value) {
      case '0011':
        actions.onSearch({
          datetype: '0011',
          startTime: dayjs().startOf('day').format('YYYY-MM-DD 00:00:00'),
          endTime: dayjs().endOf('day').format('YYYY-MM-DD 24:00:00')
        })
        break
      case '0012':
        actions.onSearch({
          datetype: '0012',
          startTime: dayjs().startOf('month').format('YYYY-MM-DD 00:00:00'),
          endTime: dayjs().endOf('month').format('YYYY-MM-DD 24:00:00')
        })
        break
      case '0013':
        actions.onSearch({
          datetype: '0013',
          startTime: dayjs().startOf('year').format('YYYY-MM-DD 00:00:00'),
          endTime: dayjs().endOf('year').format('YYYY-MM-DD 24:00:00')
        })
        break
    }
  }

  return (
    <div className={Styles.root}>
      <div className='toolbar'>
        <Radio.Group onChange={onChangeHandler} defaultValue='0011'>
          <Radio.Button value='0011'>日</Radio.Button>
          <Radio.Button value='0012'>月</Radio.Button>
          <Radio.Button value='0013'>年</Radio.Button>
        </Radio.Group>
      </div>
      <div className='charts'>
        <HighchartsReact highcharts={Highcharts} options={energyOptions} />
        <HighchartsReact highcharts={Highcharts} options={wateroptions} />
      </div>
    </div>
  )
}

export default observer(ConsumptionChart)
