export interface IIdPhotoRequest {
  file: File | null,
  onProgress?: (progressPercentage: number) => void;
}