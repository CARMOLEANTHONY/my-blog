import mixin from '../../../mixins'

export default {
  render: function (h) {
    return h('ul', {
      style: {
        margin: '20px 0'
      }
    }, this.commentList.map(item => {
      return h('li', {
        style: {
          padding: '0 0 20px 0',
          borderBottom: '1px solid #ccc'
        }
      }, [h('p', {
        style: {
          padding: '10px 0'
        }
      }, [h('span', {}, item.user_name), h('span', {
          style: {
              float: 'right'
          }
      }, mixin.filters.parseDate(item.comment_time))]), h('pre', {
        style: {
          padding: '0 20px',
          textIndent: '20px'
        }
      }, item.content), ...this.renderList(item, h)])
    }))
  },
  props: {
    commentList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    renderList(item, h) {
      if (!item.commentList || item.commentList.length == 0) return []

      item.commentList.map(v => {
        return h('div', {}, [h('p', {}, `${v.user_name} ${mixin.filters.parseDate(v.comment_time)}`), h('p', {}, v.content), ...this.renderList(v, h)])
      })
      return []
    }
  }
}
