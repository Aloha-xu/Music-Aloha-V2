//引入全部
// import Vue from 'vue'
// import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// Vue.use(Element)

//按需引入
import Vue from "vue";
import {
  Pagination,
  Dialog,
  Dropdown,
  DropdownMenu,
  Menu,
  Submenu,
  MenuItem,
  Input,
  Select,
  Option,
  Button,
  Popover,
  Form,
  Tabs,
  Alert,
  Slider,
  Icon,
  Upload,
  Card,
  Carousel,
  ColorPicker,
  Header,
  Aside,
  Main,
  Footer,
  Image,
  Loading,
  MessageBox,
  Message,
  Notification,
  Drawer,
  CarouselItem,
  Empty,
  InfiniteScroll,
  FormItem,
  TabPane,
  Skeleton,
  SkeletonItem,
  Backtop
} from "element-ui";

Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Popover);
Vue.use(Form);
Vue.use(Tabs);
Vue.use(Alert);
Vue.use(Slider);
Vue.use(Icon);
Vue.use(Upload);
Vue.use(Card);
Vue.use(Carousel);
Vue.use(ColorPicker);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Image);
Vue.use(Drawer);
Vue.use(CarouselItem);
Vue.use(Empty);
Vue.use(InfiniteScroll);
Vue.use(FormItem);
Vue.use(TabPane);
Vue.use(Skeleton);
Vue.use(SkeletonItem);
Vue.use(Backtop);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
