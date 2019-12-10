import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() {
    const rotation = {
      1: 'rotate(0deg)',
      3: 'rotate(180deg)',
      6: 'rotate(90deg)',
      8: 'rotate(270deg)'
    };
  }

  validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return (true);
    }
    return (false);
  }

  get token() {
    const tokenHash = JSON.parse(localStorage.getItem('utoken'));
    return tokenHash.token;
  }

  calImgDisplayHeight(img) {
    return 100;
  }

  // tslint:disable-next-line: ban-types
  getOrientation(file: File, callback: Function) {
    let reader = new FileReader();

    reader.onload = (event: ProgressEvent) => {

      if (! event.target) {
        return;
      }

      // tslint:disable-next-line: no-shadowed-variable
      const file = event.target as FileReader;
      const view = new DataView(file.result as ArrayBuffer);

      if (view.getUint16(0, false) != 0xFFD8) {
          return callback(-2);
      }

      const length = view.byteLength;
      let offset = 2;

      while (offset < length) {
        if (view.getUint16(offset+2, false) <= 8) { return callback(-1); }
        let marker = view.getUint16(offset, false);
        offset += 2;

        if (marker == 0xFFE1) {
          if (view.getUint32(offset += 2, false) != 0x45786966) {
            return callback(-1);
          }

          const little = view.getUint16(offset += 6, false) == 0x4949;
          offset += view.getUint32(offset + 4, little);
          const tags = view.getUint16(offset, little);
          offset += 2;
          for (let i = 0; i < tags; i++) {
            if (view.getUint16(offset + (i * 12), little) == 0x0112) {
              return callback(view.getUint16(offset + (i * 12) + 8, little));
            }
          }
        // tslint:disable-next-line: no-bitwise
        } else if ((marker & 0xFF00) != 0xFF00) {
            break;
        } else {
            offset += view.getUint16(offset, false);
        }
      }
      return callback(-1);
    };

    reader.readAsArrayBuffer(file);
  }

  getRotation(orientation) {
    switch (orientation) {
      case 1:
        return 'rotate(0deg)';
      case 3:
        return 'rotate(180deg)';
      case 6:
        return 'rotate(90deg)';
      case 8:
        return 'rotate(270deg)';
      default:
        break;
    }
  }

  getImgUrl(ver, id, format) {
    return 'https://res.cloudinary.com/flask-image/image/upload/v' + ver + '/' + id + '.' + format;
  }
}
