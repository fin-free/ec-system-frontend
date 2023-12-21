import { useContext } from 'react'

import { Radio } from 'antd'
import { RadioChangeEvent } from 'antd/lib'
import dayjs from 'dayjs'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { observer } from '@/hooks/storeHook'

import storeContext from '../context'

import Styles from './ConsumptionChart.module.scss'

const ConsumptionChart: React.FC = () => {
  const { store, actions } = useContext(storeContext)
  const { energyConsumptionData, energyConsumptionPayload } = store

  const dataRangeLabelFormat: { [key: string]: string } = {
    '0011': 'MM-DD HH:mm',
    '0012': 'MM-DD',
    '0013': 'M'
  }
  const dataRangeLabelUnit: { [key: string]: string } = { '0011': '', '0012': '', '0013': '月' }

  const energyOptions = {
    chart: {
      type: 'areaspline',
      backgroundColor: 'transparent'
    },
    title: {
      text: '最近24小时用电走势（kWh）',
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
            [1, 'rgba(0,0,0,.1)']
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
      formatter: function (this: any) {
        return `
        <p style="font-weight:bold;">时间:</p>
        <p>
          ${dayjs(this.x).format(dataRangeLabelFormat[energyConsumptionPayload.datetype])}
        </p>
        <p style="font-weight:bold;"><br><br>用能:</p>
        <p>${this.y} kWh</p>`
      }
    },
    legend: {
      enabled: false
    },
    xAxis: {
      gridLineColor: '#65656533',
      gridLineWidth: 1,
      categories: energyConsumptionData.map((d) => d.clearingPeriod),
      tickInterval: energyConsumptionPayload.datetype === '0013' ? 1 : 5,
      lineColor: '#65656533',
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
      gridLineColor: '#65656533',
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
    series: [{ name: '用能', data: energyConsumptionData.map((d) => d.energyValue) }],
    credits: { enabled: false }
  }

  const wateroptions = {
    chart: {
      type: 'areaspline',
      backgroundColor: 'transparent'
    },
    title: {
      text: '最近24小时用水走势（t）',
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
            [1, 'rgba(0,0,0,.1)']
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
      formatter: function (this: any) {
        return `
        <span style="font-weight:bold;">时间:</span>
        <span>
          ${dayjs(this.x).format(dataRangeLabelFormat[energyConsumptionPayload.datetype])}
        </span>
        <p style="font-weight:bold;"><br><br>用水:</p>
        <span>${this.y} t</span>`
      }
    },
    legend: {
      enabled: false
    },
    xAxis: {
      gridLineColor: '#65656533',
      gridLineWidth: 1,
      showLastLabel: true,
      categories: energyConsumptionData.map((d) => d.clearingPeriod),
      tickInterval: energyConsumptionPayload.datetype === '0013' ? 1 : 5,
      lineColor: '#65656533',
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
      gridLineColor: '#65656533',
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
    series: [{ name: '用水', data: energyConsumptionData.map((d) => d.energyValue) }],
    credits: { enabled: false }
  }

  const onChangeHandler = (e: RadioChangeEvent) => {
    switch (e.target.value) {
      case '0011':
        actions.onSearch({
          datetype: '0011',
          startTime: dayjs().add(-1, 'day').format('YYYY-MM-DD HH:mm:ss'),
          endTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
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
