import React, { PureComponent } from 'react'

import { Button, Result } from 'antd'

import { ROUTE_PATH_ROOT } from '@/routes/routePath'

import style from './index.module.scss'

interface IState {
  hasError: boolean
}

export default class ErrorBound extends PureComponent<React.PropsWithChildren, IState> {
  static getDerivedStateFromError(err: Error) {
    console.error('-> err bound', err)
    return {
      hasError: true
    }
  }

  state: IState = {
    hasError: false
  }

  handleGoHomeOnClick = () => {
    window.location.href = ROUTE_PATH_ROOT
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={style.root}>
          <Result
            status='warning'
            title='错误异常，请返回首页'
            extra={
              <Button type='primary' onClick={this.handleGoHomeOnClick} style={{ margin: 'auto' }}>
                返回首页
              </Button>
            }
          />
        </div>
      )
    }

    return <>{this.props.children}</>
  }

  componentDidCatch(err: Error, info: React.ErrorInfo) {
    console.error(err, info)
  }
}
