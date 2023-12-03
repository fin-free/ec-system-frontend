import axios from 'axios'

declare module 'axios' {
  interface IAxios<U = any> {
    code: number
    message: string
    data: U
  }
  export interface AxiosResponse<T = any> extends IAxios<U> {}
}
