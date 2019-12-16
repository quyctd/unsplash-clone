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

  get userCollections() {
    if (this.currentUser) {
      return this.currentUser.collections;
    } else {
      return [];
    }
  }

  set userCollections(val) {
    const current = this.currentUser;
    current.collections = val;
    localStorage.setItem('currentUser', JSON.stringify({ user: current }));
  }

  get token() {
    const tokenLocal = localStorage.getItem('utoken');
    if (tokenLocal !== null && tokenLocal !== undefined) {
      const tokenHash = JSON.parse(tokenLocal);
      return tokenHash.token;
    } else {
      return null;
    }
  }

  get currentUser() {
    const userLocal = localStorage.getItem('currentUser');
    if (userLocal !== null && userLocal !== undefined) {
      return JSON.parse(userLocal).user;
    } else {
      return null;
    }
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
    if (ver === undefined || id === undefined || format === undefined) { return ''; }
    return 'https://res.cloudinary.com/flask-image/image/upload/v' + ver + '/' + id + '.' + format;
  }

  ISODateString(date) {
    let d = new Date(date);
    return d.getFullYear() + '-'
        + this.pad(d.getUTCMonth() + 1) + '-'
        + this.pad(d.getUTCDate()) + 'T'
        + this.pad(d.getUTCHours()) + ':'
        + this.pad(d.getUTCMinutes()) + ':'
        + this.pad(d.getUTCSeconds()) + 'Z';
  }

  pad(n: any) {return n < 10 ? '0' + n : n; }

  dateToText(createdTime) {
    let updateTime = new Date(createdTime);
    const d = new Date();
    // parse both time stamps into dates
    const finalCurrentTime = Date.parse(this.ISODateString(d));
    const finalPostDateTime = Date.parse(this.ISODateString(updateTime));

    // find the difference between the original post date/time and the current date/time (in milliseconds)
    const responseTimeFinal = Math.abs(finalCurrentTime - finalPostDateTime);
    const days: any = Math.floor(responseTimeFinal / (24 * 60 * 60 * 1000));
    let timeDifference: any;
    if (days >= 1) {
      if (updateTime.getFullYear() == d.getFullYear()) {
        if (updateTime.getMonth() == d.getMonth() && Math.abs(updateTime.getDate() - d.getDate()) < 7) {
          timeDifference = this.formatWeekDate(updateTime);
        } else {
          timeDifference = this.formatMediumDate(updateTime);
        }
      } else {
        timeDifference = this.formatFarDate(updateTime);
      }
    } else {
      // pass the milliseconds from responseTimeFinal into the dhm function to convert it back to a date
      timeDifference = this.formatInDays(responseTimeFinal);
    }
    return timeDifference;  // final result
  }

  formatFarDate(d) {
    // tslint:disable:variable-name
    const m_names = new Array('January', 'February', 'March',
      'April', 'May', 'June', 'July', 'August', 'September',
      'October', 'November', 'December');

    d = new Date(d);
    const curr_date = d.getDate();
    let sup = '';
    if (curr_date == 1 || curr_date == 21 || curr_date == 31) {
      sup = 'st';
    } else if (curr_date == 2 || curr_date == 22) {
      sup = 'nd';
    } else if (curr_date == 3 || curr_date == 23) {
      sup = 'rd';
    } else {
      sup = 'th';
    }
    const curr_month = d.getMonth();
    const curr_year = d.getFullYear();

    return m_names[curr_month] + ' ' + curr_date + sup + ', ' + curr_year;
  }

  formatMediumDate(d) {
    d = new Date(d);
    // tslint:disable:variable-name
    const m_names = new Array('January', 'February', 'March',
      'April', 'May', 'June', 'July', 'August', 'September',
      'October', 'November', 'December');

    const curr_date = d.getDate();
    let sup = '';
    if (curr_date == 1 || curr_date == 21 || curr_date == 31) {
      sup = 'st';
    } else if (curr_date == 2 || curr_date == 22) {
      sup = 'nd';
    } else if (curr_date == 3 || curr_date == 23) {
      sup = 'rd';
    } else {
      sup = 'th';
    }
    const curr_month = d.getMonth();

    // determine the time hours
    let a_p = '';
    let curr_hour = d.getUTCHours();
    if (curr_hour < 12) {
      a_p = 'AM';
    } else {
      a_p = 'PM';
    }
    if (curr_hour == 0) {
      curr_hour = 12;
    }
    if (curr_hour > 12) {
      curr_hour = curr_hour - 12;
    }
    curr_hour = (curr_hour < 10) ? '0' + curr_hour : curr_hour;

    let curr_minute = d.getUTCMinutes();
    curr_minute = (curr_minute < 10) ? '0' + curr_minute : curr_minute;
    return m_names[curr_month] + ' ' + curr_date + sup + ', ' + curr_hour + ':' + curr_minute + ' ' + a_p;
  }

  formatWeekDate(d) {
    // tslint:disable:variable-name
    d = new Date(d);
    // determine days
    const d_names = new Array('Sunday', 'Monday', 'Tuesday',
      'Wednesday', 'Thursday', 'Friday', 'Saturday');

    const curr_day = d.getDay();
    // determine the time hours
    let a_p = '';
    let curr_hour = d.getUTCHours();
    if (curr_hour < 12) {
      a_p = 'AM';
    } else {
      a_p = 'PM';
    }
    if (curr_hour == 0) {
      curr_hour = 12;
    }
    if (curr_hour > 12) {
      curr_hour = curr_hour - 12;
    }
    curr_hour = (curr_hour < 10) ? '0' + curr_hour : curr_hour;

    let curr_minute = d.getUTCMinutes();
    curr_minute = (curr_minute < 10) ? '0' + curr_minute : curr_minute;

    return d_names[curr_day] + ', ' + curr_hour + ':' + curr_minute + ' ' + a_p;
  }

  formatInDays(ms: number) {
    let days2: any = Math.floor(ms / (24 * 60 * 60 * 1000));
    const daysms: any = ms % (24 * 60 * 60 * 1000);
    let hours2: any = Math.floor((daysms) / (60 * 60 * 1000));
    const hoursms: any = ms % (60 * 60 * 1000);
    let minutes2: any = Math.floor((hoursms) / (60 * 1000));
    const minutesms: any = ms % (60 * 1000);
    let sec: any = Math.floor((minutesms) / (1000));

    days2 = (days2 < 10) ? '0' + days2 : days2;
    hours2 = (hours2 < 10) ? '0' + hours2 : hours2;
    minutes2 = (minutes2 < 10) ? '0' + minutes2 : minutes2;
    sec = (sec < 10) ? '0' + sec : sec;

    // tslint:disable:triple-equals
    if (days2 == '00' && hours2 == '00' && minutes2 == '00' && sec != '00') {
      if (sec < '30') {
        return 'less then a minute';
      } else {
        return 'about a minute ago';
      }
    }

    if (days2 == '00' && hours2 == '00' && minutes2 != '00') {
      if (minutes2 == '01') {
        return 'about a minute ago';
      } else {
        return 'about ' + minutes2 + ' minutes ago';
      }
    }

    if (days2 == '00' && hours2 != '00') {
      if (hours2 == '01') {
        return 'about an hour ago';
      } else {
        return 'about ' + hours2 + ' hours ago';
      }
    }

    if (days2 != '00') {
      if (days2 == '01') {
        return 'about a day ago';
      } else {
        return 'about ' + days2 + ' days ago';
      }
    }

    return 'less then a minute';
  }
}
