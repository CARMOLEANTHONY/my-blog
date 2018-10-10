<template>
  <quill-editor v-model="currentContent" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)" @change="onEditorChange($event)">
  </quill-editor>
</template>
<script>
  import {
    quillEditor
  } from 'vue-quill-editor'
  export default {
    data() {
      return {
        currentContent: ''
      }
    },
    props: {
      editorOption: {
        type: Object,
        default: () => {
          return {
            placeholder: '请输入内容'
          }
        }
      }
    },
    watch: {
      content(val) {
        this.currentContent = val
      }
    },
    methods: {
      onEditorBlur() {

      },
      onEditorFocus() {},
      onEditorChange() {},
      setContent(content) {
        this.currentContent = content
      }
    }
  }

</script>
