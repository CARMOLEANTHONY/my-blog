import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'
import Vue from 'vue'

Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre');

  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})
