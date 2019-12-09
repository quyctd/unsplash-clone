export class PhotoUpload {
  width: number;
  height: number;
  originalFilename: string;
  uploadStatus: string;
  uploadHost: string;
  uploadIp: string;
  userId: number;
  file: any;
  imgBlob: any;
  type: any;
  progress = 0;
  cloudVersion: string;
  cloudId: string;
  format: string;
  cancelOnFinish = false;
  fileIndex: any;
  paddingBottom: any;
  deleteToken: any;
}
