import moment from 'moment'

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
    codeFormat(code) {
      code = code.replace('#code', '<pre><code>')

      return code.replace('code#', '</code></pre>')
    }
  }
}
