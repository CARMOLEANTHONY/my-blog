import moment from 'moment'
import store from '../store'

export default {
  filters: {
    timeFormat(time, format = 'YYYY-MM-DD HH:mm:ss') {
      return moment(time).format(format);
    },
    parseDate(time, format = 'YYYY/MM/DD HH:mm:ss') {
      return moment(time).format(format);
    },
    getTimestamp(time, format = 'YYYY/MM/DD HH:mm:ss') {
      return moment(time).valueOf();
    },
    numberFormat(num) {
      if (num == '') return ''

      if (/\.\d{3,}/.test(num)) return Number(num).toFixed(2)

      return num
    },
    filterMyself(val) {
      return val == store.getters.getUName ? '我' : val
    }
  }
}
