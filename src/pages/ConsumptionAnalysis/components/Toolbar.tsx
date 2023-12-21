import { useContext, useState } from 'react'

import type { DatePickerProps } from 'antd'
import { DatePicker, Radio, RadioChangeEvent, Select } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

import { observer } from '@/hooks/storeHook'

import storeContext from '../context'

import Styles from './Toolbar.module.scss'

const Toolbar: React.FC = () => {
  const { actions } = useContext(storeContext)
  const [date, setDate] = useState<Dayjs | null>(dayjs())
  const [pickerType, setPickerType] = useState<'date' | 'month' | 'year'>('date')

  const onDataTypeChange = (e: RadioChangeEvent) => {
    const dateType = e.target.value

    switch (dateType) {
      case '0011':
        setPickerType('date')
        setDate(dayjs())
        actions.onSearch({
          datetype: dateType,
          startTime: dayjs().format('YYYY-MM-DD 00:00:00'),
          endTime: dayjs().format('YYYY-MM-DD 24:00:00')
        })
        break
      case '0012':
        setPickerType('month')
        setDate(dayjs())
        actions.onSearch({
          datetype: dateType,
          startTime: dayjs().startOf('month').format('YYYY-MM-DD 00:00:00'),
          endTime: dayjs().format('YYYY-MM-DD 24:00:00')
        })
        break
      case '0013':
        setPickerType('year')
        setDate(dayjs())
        actions.onSearch({
          datetype: dateType,
          startTime: dayjs().startOf('year').format('YYYY-MM-DD 00:00:00'),
          endTime: dayjs().endOf('year').format('YYYY-MM-DD 24:00:00')
        })
        break
    }
  }

  const onModeChange = (e: RadioChangeEvent) => {
    actions.updateMode(e.target.value)
  }

  const onDateChange: DatePickerProps['onChange'] = (date: Dayjs | null) => {
    setDate(date)
    const dateRange = pickerType === 'date' ? 'day' : pickerType
    const startDateformat = 'YYYY-MM-DD 00:00:00'
    const endDateformat = 'YYYY-MM-DD 24:00:00'
    const startTime =
      dateRange === 'day' ? dayjs(date).format(startDateformat) : dayjs(date).startOf(dateRange).format(startDateformat)
    const endTime =
      dateRange === 'day' ? dayjs(date).format(endDateformat) : dayjs(date).endOf(dateRange).format(endDateformat)

    actions.onSearch({
      startTime,
      endTime
    })
  }

  const disabledDate = (current: Dayjs) => {
    return current && current > dayjs().endOf('day')
  }

  return (
    <div className={Styles.root}>
      <div className='filters'>
        <Select
          options={[
            { label: '电', value: '0002' },
            { label: '水', value: '0001' }
          ]}
          onChange={(val) => {
            actions.onSearch({
              datatype: val
            })
          }}
          defaultValue='0002'
        />
        <DatePicker
          allowClear={false}
          value={date}
          picker={pickerType}
          disabledDate={disabledDate}
          onChange={onDateChange}
        />
        <Radio.Group onChange={onDataTypeChange} defaultValue='0011'>
          <Radio.Button value='0011'>按小时</Radio.Button>
          <Radio.Button value='0012'>按日</Radio.Button>
          <Radio.Button value='0013'>按月</Radio.Button>
        </Radio.Group>
      </div>
      <Radio.Group className='radio-group' onChange={onModeChange} defaultValue='chart'>
        <Radio.Button value='chart'>图表</Radio.Button>
        <Radio.Button value='table'>数据</Radio.Button>
      </Radio.Group>
    </div>
  )
}

export default observer(Toolbar)
