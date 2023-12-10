import { useContext } from 'react'

import { DatePicker, Radio, RadioChangeEvent } from 'antd'
import type { Dayjs } from 'dayjs'
import { observer, useStore } from '@/hooks/storeHook'

import storeContext from '../context'

import Styles from './Toolbar.module.scss'

const { RangePicker } = DatePicker
type RangeValue = [Dayjs | null, Dayjs | null] | null

const Toolbar: React.FC = () => {
  const {} = useStore()
  const { actions } = useContext(storeContext)

  const onDateChange = (date: RangeValue) => {
    actions.onSearch({
      startTime: date![0]!.format('YYYY-MM-DD HH:mm:ss'),
      endTime: date![1]!.format('YYYY-MM-DD HH:mm:ss')
    })
  }

  const onDataTypeChange = (e: RadioChangeEvent) => {
    actions.onSearch({
      datetype: e.target.value
    })
  }

  const onModeChange = (e: RadioChangeEvent) => {
    actions.updateMode(e.target.value)
  }

  return (
    <div className={Styles.root}>
      <RangePicker format={'YYYY-MM-DD'} onChange={onDateChange} />
      <Radio.Group onChange={onDataTypeChange} defaultValue='0011'>
        <Radio.Button value='0011'>按小时</Radio.Button>
        <Radio.Button value='0012'>按日</Radio.Button>
        <Radio.Button value='0013'>按月</Radio.Button>
      </Radio.Group>
      <Radio.Group className='radio-group' onChange={onModeChange} defaultValue='table'>
        <Radio.Button value='table'>数据</Radio.Button>
        <Radio.Button value='chart'>图表</Radio.Button>
      </Radio.Group>
    </div>
  )
}

export default observer(Toolbar)
