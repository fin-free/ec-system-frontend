import { useContext } from 'react'

import { DatePicker, Radio, RadioChangeEvent, Select } from 'antd'
import storeContext from '../context'
import type { Dayjs } from 'dayjs'

import { useStore, observer } from '@/hooks/storeHook'
import Styles from './Toolbar.module.scss'

const { RangePicker } = DatePicker

type RangeValue = [Dayjs | null, Dayjs | null] | null

const Toolbar: React.FC = () => {
  const {
    commonStore: { dataTypeOptions, functionTypeOptions }
  } = useStore()
  const {
    actions,
    store: { filters }
  } = useContext(storeContext)

  const onDateChange = (date: RangeValue) => {
    actions.onSearch({
      startTime: date![0]!.format('YYYY-MM-DD HH:mm:ss'),
      endTime: date![1]!.format('YYYY-MM-DD HH:mm:ss')
    })
  }

  const onDataTypeChange = (value: string) => {
    actions.onSearch({
      datetype: value
    })
  }

  const onFunctionTypeChange = (value: string) => {
    actions.onSearch({
      functiontype: value
    })
  }

  const onModeChange = (e: RadioChangeEvent) => {
    actions.updateMode(e.target.value)
  }

  return (
    <div className={Styles.root}>
      <RangePicker format={'YYYY-MM-DD'} onChange={onDateChange} />
      <Select options={functionTypeOptions} defaultValue={filters?.functiontype} onChange={onFunctionTypeChange} />
      <Select options={dataTypeOptions} defaultValue={filters?.datetype} onChange={onDataTypeChange} />
      <Radio.Group className='radio-group' onChange={onModeChange} defaultValue='table' >
        <Radio.Button value='table'>数据</Radio.Button>
        <Radio.Button value='chart'>图表</Radio.Button>
      </Radio.Group>
    </div>
  )
}

export default observer(Toolbar)
