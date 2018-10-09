import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import CreateLoading from './loading'
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
  Badge,
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
  Badge,
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
