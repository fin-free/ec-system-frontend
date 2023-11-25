import Axios from './axios'

interface requestOptions {
  url: string
  method?: string
  data?: object
  params?: object
  headers?: object
  responseType?: string
  showLoading?: boolean
}

const request = (options: requestOptions) => {
  const {
    url,
    method = 'get',
    data = {},
    params = {},
    headers = {},
    showLoading = true,
    responseType = 'json'
  } = options

  const config: Record<string, unknown> = {
    method,
    url,
    data,
    params,
    headers,
    responseType,
    showLoading
  }

  return Axios(config)
}

export default request
