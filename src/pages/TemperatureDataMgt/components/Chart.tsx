import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import Styles from './Chart.module.scss'

const ConsumptionChart: React.FC = () => {
  const options = {
    chart: {
      type: 'line',
      backgroundColor: '#001529'
    },
    title: {
      text: '用能统计',
      style: { color: '#ffffff' }
    },
    legend: {
      itemStyle: {
        color: '#ffffff'
      }
    },
    xAxis: {
      categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      labels: {
        style: {
          color: 'white'
        }
      }
    },
    yAxis: {
      title: {
        text: '纵坐标title'
      },
      labels: {
        style: {
          color: 'white'
        }
      }
    },
    series: [
      {
        name: '设备1',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
      },
      {
        name: '设备2',
        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
      }
    ],
    credits: { enabled: false }
  }

  return (
    <div className={Styles.root}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

export default ConsumptionChart
