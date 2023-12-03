import request from './request'

type archiveType = {
  archivesLevel?: number
  archivesId?: number
  archivesName: string
  parentId: number
  projectId: string //项目Id
}

const addArchive = async (params: archiveType) => {
  try {
    const res = await request({
      url: '/sys-archives/add',
      method: 'POST',
      data: params
    })
    const { code, data, message } = res ?? {}
    if (code === 200 && data) {
      return data
    } else {
      throw new Error(message)
    }
  } catch (error) {
    console.error('addArchive error: ', error)
  }
}

const updateArchive = async (params: archiveType) => {
  try {
    const res = await request({
      url: '/sys-archives/update',
      method: 'POST',
      data: params
    })
    const { code, data, message } = res ?? {}
    if (code === 200 && data) {
      return data
    } else {
      throw new Error(message)
    }
  } catch (error) {
    console.error('updateArchive error: ', error)
  }
}

const deleteArchive = async (params: archiveType) => {
  const { archivesId } = params
  try {
    const res = await request({
      url: `sys-archives/delete?archivesId=${archivesId}`,
      method: 'DELETE'
    })
    const { code, data, message } = res ?? {}
    if (code === 200 && data) {
      return data
    } else {
      throw new Error(message)
    }
  } catch (error) {
    console.error('deleteArchive error: ', error)
  }
}

export { addArchive, updateArchive, deleteArchive }
