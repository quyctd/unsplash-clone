export class PhotoUpload {
  naturalWidth: number;
  naturalHeight: number;
  originalFilename: string;
  uploadStatus: string;
  uploadHost: string;
  uploadIp: string;
  userId: number;
  file: any;
  imgBlob: any;
  type: any;
  progress: any;

  get paddingBottom() {
    const ret = this.naturalHeight / this.naturalWidth * 100;
    return ret;
  }

  get isJPG() {
    if (this.originalFilename.includes('.JPG')) {
      return true;
    }
    return false;
  }
}
