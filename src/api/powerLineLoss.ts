import request from './request'

type LossComparePayload = {
  datetype: string //0012日  0013月
  energyid: string //0001 水 0002 电
  datetime: string //选择的时间 yyyy-MM-dd HH:mm:ss
  projectId: string //项目Id
}

const getLossCompareData = async (params: LossComparePayload) => {
  try {
    const res = await request({
      url: '/energy/losscompare',
      method: 'post',
      data: params
    })
    const { code, data, message } = res ?? {}
    if (code === 200 && data) {
      return data
    } else {
      throw new Error(message)
    }
  } catch (error) {
    console.error('getLossCompareData error: ', error)
  }
}

export { getLossCompareData }
