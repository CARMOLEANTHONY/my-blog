import hljs from 'highlight.js'
import Vue from 'vue'

Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre');

  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})
