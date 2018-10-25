import mixin from '../../../mixins'
import LikeBadge from '../likeBadge/index'

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
      }, [h('span', {
        style: {
          fontWeight: 'bold'
        }
      }, item.user_name), h('span', {
        style: {
          float: 'right'
        }
      }, mixin.filters.parseDate(item.comment_time))]), h('div', {
        style: {
          padding: '0 20px'
        },
        class: 'ql-editor',
        domProps: {
          innerHTML: item.content
        },
        directives: [{
          name: 'highlight'
        }, h('like-badge', {
          props: {
            aId: item.comment_id,
            value: 3,
            isLike: true
          }
        })]
      }), ...this.renderList(item, h)])
    }))
  },
  props: {
    commentList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    LikeBadge
  },
  methods: {
    renderList(item, h) {
      if (!item.commentList || item.commentList.length == 0) return []

      return item.commentList.map(v => {
        return h('div', {
          style: {
            padding: '20px'
          }
        }, [h('p', {}, [h('span', {
          style: {
            display: 'inline-block',
            padding: '0 5px 0 20px',
            fontWeight: 'bold'
          }
        }, v.user_name), h('span', {
          style: {
            display: 'inline-block',
            padding: '0 5px 0 20px'
          }
        }, `于 ${mixin.filters.parseDate(v.comment_time)} 回复`), h('span', {
          style: {
            display: 'inline-block',
            padding: '0 5px 0 20px',
            fontWeight: 'bold'
          }
        }, item.user_name)]), h('p', {
          style: {
            padding: '20px'
          },
          directives: [{
            name: 'highlight'
          }],
          domProps: {
            innerHTML: v.content
          },
        }), ...this.renderList(v, h)])
      })
    }
  }
}
