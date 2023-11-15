import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const Trend: React.FC = () => {
  const options = {
    chart: {
      type: 'line',
      backgroundColor: '#001529'
    },
    title: {
      text: '模块title'
    },
    xAxis: {
      title: {
        text: '横坐标title'
      }
    },
    yAxis: {
      title: {
        text: '纵坐标title'
      }
    },
    series: [
      {
        data: [1, 2, 3]
      }
    ],
    credits: { enabled: false }
  }

  return (
    <div style={{ width: '50%' }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

export default Trend
