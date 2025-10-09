// 공지사항 타입
export type NoticeType = 'GUIDE' | 'NOTICE';

// 공지사항 목록 아이템
export interface INoticeListItem {
  id: string;
  title: string;
  type: NoticeType;
  isPinned: boolean;
  createdAt: string;
}

// 공지사항 전체 조회 응답
export interface INoticeListResponse {
  notices: INoticeListItem[];
}

// 공지사항 전체 조회 요청 파라미터
export interface INoticeListRequest {
  type: NoticeType;
}

// 공지사항 상세 조회 응답
export interface INoticeDetailResponse {
  title: string;
  content: string;
  createdAt: string;
  type: NoticeType;
  imageURL: string | null;
  imageName: string | null;
  attachFiles: IAttachFile[];
  isPinned: boolean;
}

// 첨부파일 타입
export interface IAttachFile {
  attachFileUrl: string;
  attachFileName: string;
}

// 공지사항 생성 요청
export interface INoticeCreateRequest {
  title: string;
  content: string;
  isPinned: boolean;
  type: NoticeType;
  fileName?: string;
  attachFileName?: string[];
}

// 공지사항 수정 요청
export interface INoticeUpdateRequest {
  title: string;
  content: string;
  isPinned: boolean;
  type: NoticeType;
  fileName?: string;
  attachFileName?: string[];
}

// 이미지 업로드 요청
export interface INoticeImageUploadRequest {
  photo: string;
}

// 공지사항 제목 조회 아이템
export interface INoticeTitleItem {
  id: string;
  title: string;
  createdAt: string;
}

// 공지사항 제목 조회 응답
export type INoticeTitleListResponse = INoticeTitleItem[];
