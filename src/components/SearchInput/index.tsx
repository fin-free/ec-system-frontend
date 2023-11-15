import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { InputProps } from 'antd/es/input'

interface IProps extends InputProps {}

const SearchInput: React.FC<IProps> = (props: IProps) => {
  return <Input {...props} suffix={<SearchOutlined />} />
}

export default SearchInput
