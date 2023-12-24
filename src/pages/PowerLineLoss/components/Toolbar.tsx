import { useContext } from 'react'

import { DatePicker, Radio, RadioChangeEvent, Select } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

import { observer } from '@/hooks/storeHook'

import storeContext from '../context'

import Styles from './Toolbar.module.scss'

const Toolbar: React.FC = () => {
  const {
    actions,
    store: { filters }
  } = useContext(storeContext)

  const onDateChange = (date: Dayjs | null) => {
    actions.updateDateTimeChange(date?.format('YYYY-MM-DD HH:mm:ss')!)
    actions.getLossCompareData()
  }

  const onDateTypeChange = (e: RadioChangeEvent) => {
    actions.updateDateTypeChange(e.target.value)
    actions.getLossCompareData()
  }

  const handleEngrgyTypeChange = (value: string) => {
    actions.updateDataTypeChange(value)
    actions.getLossCompareData()
  }

  return (
    <div className={Styles.root}>
      <Select
        value={filters.datatype}
        placeholder='设备类型'
        onChange={handleEngrgyTypeChange}
        options={[
          { label: '电', value: '0002' },
          { label: '水', value: '0001' }
        ]}
        defaultValue={'0002'}
      />
      <Radio.Group className={Styles.radioGroup} onChange={onDateTypeChange} defaultValue='0012'>
        <Radio.Button value='0012'>按日</Radio.Button>
        <Radio.Button value='0013'>按月</Radio.Button>
      </Radio.Group>
      <DatePicker
        defaultValue={dayjs().add(-1, 'day')}
        picker={filters.datetype === '0012' ? 'date' : 'month'}
        format={filters.datetype === '0012' ? 'YYYY-MM-DD' : 'YYYY-MM'}
        onChange={onDateChange}
      />
    </div>
  )
}

export default observer(Toolbar)
