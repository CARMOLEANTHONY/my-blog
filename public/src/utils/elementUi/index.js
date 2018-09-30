import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import {
  Form,
  FormItem,
  Input,
  InputNumber,
  Select,
  Option,
  Button,
  Tree,
  Breadcrumb,
  BreadcrumbItem,
  Checkbox,
  CheckboxGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Table,
  TableColumn,
  Message,
  MessageBox,
  Dialog,
  Radio,
  RadioGroup,
  Menu,
  MenuItem,
  Submenu,
  Pagination,
  Tabs,
  TabPane,
  Row,
  Col,
  Cascader,
  DatePicker,
  Card,
  Collapse,
  CollapseItem,
  Upload,
  Steps,
  Step,
  Loading,
  Progress,
  Tooltip,
  Transfer,
  Switch
} from 'element-ui'

Vue.prototype.$msg = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$loading = Loading.service

class CreateLoading {
  constructor(options = {}) {
    options = options || {}

    this.dom = document.createElement('div')

    this.dom.innerHTML = `<image class='center' src='/BLOGS/public/src/assets/images/loading1.gif'></image>`

    this.dom.class = 'loading_mask'

    this.duration = options.duration || 2000

    this.isClose = true
  }

  close() {
    if (this.isClose) return
    this.dom.classList.add('hide')
    document.body.removeChild(this.dom)
  }

  open() {
    this.isClose = false

    document.body.appendChild(this.dom)  
    this.dom.classList.remove('hide')

    setTimeout(() => {
      !this.isClose && this.close()
    }, this.duration)
  }
}

Vue.prototype.$Loading = CreateLoading

const arr = [
  Form,
  FormItem,
  Input,
  InputNumber,
  Select,
  Option,
  Button,
  Tree,
  Breadcrumb,
  BreadcrumbItem,
  Checkbox,
  CheckboxGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Table,
  TableColumn,
  Dialog,
  Radio,
  RadioGroup,
  Menu,
  MenuItem,
  Submenu,
  Pagination,
  Tabs,
  TabPane,
  Row,
  Col,
  Cascader,
  DatePicker,
  Card,
  Collapse,
  CollapseItem,
  Upload,
  Steps,
  Step,
  Progress,
  Tooltip,
  Transfer,
  Switch
]

for (let i = 0; i < arr.length; i++) {
  Vue.use(arr[i])
}
