import request from './request'

type LineComparisonPayload = {
  datetype: string //0011 小时  0012 日 0013 月
  energyid: string //0001 水  0002 电
  archivesId: string //建筑Id
  projectId: string //项目Id
  startTime: string //查询开始时间 yyyy-MM-dd HH:mm:ss
  endTime: string //查询结束时间 yyyy-MM-dd HH:mm:ss
  archivesIds: Array<number> //建筑Id集合
}

const getLineComparisonData = async (params: LineComparisonPayload) => {
  try {
    const res = await request({
      url: '/energy/buildcompare',
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
    console.error('getLineComparisonData error: ', error)
  }
}

export { getLineComparisonData }
