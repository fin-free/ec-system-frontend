import { useContext, useState } from 'react'

import { DatePicker, Radio, RadioChangeEvent, Select } from 'antd'
import type { Dayjs } from 'dayjs'

import { observer } from '@/hooks/storeHook'

import storeContext from '../context'

import Styles from './Toolbar.module.scss'

const { RangePicker } = DatePicker
type RangeValue = [Dayjs | null, Dayjs | null] | null

const Toolbar: React.FC = () => {
  const {
    actions,
    store: { filters }
  } = useContext(storeContext)
  const [dates, setDates] = useState<RangeValue>(null)
  const [value, setValue] = useState<RangeValue>(null)
  const [maxDateRange, setMaxDateRange] = useState<number>(1)

  const onDateChange = (date: RangeValue) => {
    setValue(date)
    const startTime = date![0]!.format('YYYY-MM-DD HH:mm:ss')
    const endTime = date![1]!.format('YYYY-MM-DD HH:mm:ss')
    filters.startTime = startTime
    filters.endTime = endTime
    actions.getLineComparisonData({
      startTime,
      endTime
    })
  }

  const onDateTypeChange = (e: RadioChangeEvent) => {
    const dateType = e.target.value
    switch (dateType) {
      case '0011':
        setMaxDateRange(1)
        break
      case '0012':
        setMaxDateRange(7)
        break
      case '0013':
        setMaxDateRange(30)
        break
    }

    filters.datetype = dateType
    actions.getLineComparisonData({
      datetype: dateType
    })
  }

  const onDataTypeChange = (type: string) => {
    filters.datatype = type
    actions.getLineComparisonData({
      datatype: type
    })
  }

  const onModeChange = (e: RadioChangeEvent) => {
    actions.updateMode(e.target.value)
  }

  const disabledDate = (current: Dayjs) => {
    if (!dates) {
      return false
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') >= maxDateRange
    const tooEarly = dates[1] && dates[1].diff(current, 'days') >= maxDateRange
    return !!tooEarly || !!tooLate
  }

  return (
    <div className={Styles.root}>
      <Select
        options={[
          { label: '电', value: '0002' },
          { label: '水', value: '0001' }
        ]}
        onChange={onDataTypeChange}
        defaultValue='0002'
      />
      <RangePicker
        value={dates || value}
        format={'YYYY-MM-DD'}
        onChange={onDateChange}
        disabledDate={disabledDate}
        onCalendarChange={(val) => setDates(val)}
      />
      <Radio.Group onChange={onDateTypeChange} defaultValue='0011'>
        <Radio.Button value='0011'>按小时</Radio.Button>
        <Radio.Button value='0012'>按日</Radio.Button>
        <Radio.Button value='0013'>按月</Radio.Button>
      </Radio.Group>
      <Radio.Group
        className='radio-group'
        onChange={onModeChange}
        defaultValue='chart'
      >
        <Radio.Button value='chart'>图表</Radio.Button>
        <Radio.Button value='table'>数据</Radio.Button>
      </Radio.Group>
    </div>
  )
}

export default observer(Toolbar)
