export interface INoticeCreateType {
  title: string,
  content: string,
  isPinned: boolean,
  type: string,
  fileName: string,
  attachFileName: string[]
}


export interface INoticeUpdateType {
  data : {
    title: string,
    content: string,
    isPinned: boolean,
    type: string,
    fileName: string,
    attachFileName: string[]
  }
  noticeId: string
}



export interface INoticeImgUploadType {
  photo: string
}

