import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import CreateLoading from './loading'
import {
  Input,
  InputNumber,
  Select,
  Option,
  Button,
  Message,
  MessageBox,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Radio,
  Pagination,
  Row,
  Badge,
  Col,
  Card,
  Notification
} from 'element-ui'

Vue.prototype.$msg = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$notify = Notification
Vue.prototype.$Loading = CreateLoading

Vue.prototype.$ELEMENT = {
  zIndex: 9999
};

const arr = [
  Input,
  InputNumber,
  Select,
  Option,
  Button,
  Badge,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Radio,
  Pagination,
  Row,
  Col,
  Card
]

for (let i = 0; i < arr.length; i++) {
  Vue.use(arr[i])
}
