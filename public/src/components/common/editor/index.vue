<template>
  <quill-editor v-model="currentContent" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)" @change="onEditorChange($event)">
  </quill-editor>
</template>
<script>
  import {
    quillEditor
  } from "vue-quill-editor";

  const toolbarOptions = [
    ["bold", "italic", "underline"],
    ["blockquote", "code-block"],
    [{
        list: "ordered"
      },
      {
        list: "bullet"
      }
    ],
    [{
      header: 1
    }, {
      header: 2
    }],
    [{
        script: "sub"
      },
      {
        script: "super"
      }
    ],
    [{
        indent: "-1"
      },
      {
        indent: "+1"
      }
    ],
    [{
        color: []
      },
      {
        background: []
      }
    ],
    [{
      font: []
    }],
    [{
      align: []
    }],
    ["image"]
  ];
  export default {
    data() {
      return {
        currentContent: ""
      };
    },
    props: {
      Placeholder: {
        type: String,
        default: "请输入内容"
      }
    },
    computed: {
      editorOption: function () {
        return {
          placeholder: this.Placeholder,
          modules: {
            toolbar: toolbarOptions
          }
        };
      },
      result: function () {
        if (this.currentContent == "") return "";

        return this.currentContent;
      }
    },
    methods: {
      onEditorBlur() {},
      onEditorFocus() {},
      onEditorChange() {},
      setContent(content) {
        this.currentContent = content;
      }
    }
  };

</script>
