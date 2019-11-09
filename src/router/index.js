import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Changepwd from '../views/Changepwd.vue'
import My from '../views/My.vue'
import DataEdit from '../views/DataEdit.vue'
import TelEdit from '../views/TelEdit.vue'
import PwdEdit from '../views/PwdEdit.vue'
import Feedback from '../views/Feedback.vue'
import Category from '../views/Category.vue'
import CategorySet from '../views/CategorySet.vue'
import AddCategory from '../views/AddCategory.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import AddBookkeeping from '../views/AddBookkeeping.vue'
import AccountList from '../views/AccountList.vue'
import AddAccount from '../views/AddAccount.vue'
import AccountEdit from '../views/AccountEdit.vue'
import AccountDetails from '../views/AccountDetails.vue'
import BillDetails from '../views/BillDetails.vue'
import BillModify from '../views/BillModify.vue'
import BillEdit from '../views/BillEdit.vue'
import Stay from '../views/Stay.vue'
import Addfollow from '../views/Addfollow.vue'
import AccountBook from '../views/AccountBook.vue'
import Addbook from '../views/Addbook.vue'
import BookDetails from '../views/BookDetails.vue'
import Addmember from '../views/Addmember.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/changepwd',
    name: 'changepwd',
    component: Changepwd
  },
  {
    path: '/user',
    name: 'user',
    component: My
  },
  {
    path: '/dataEdit',
    name: 'dataEdit',
    component: DataEdit
  },
  {
    path: '/telEdit',
    name: 'telEdit',
    component: TelEdit
  },
  {
    path: '/pwdEdit',
    name: 'pwdEdit',
    component: PwdEdit
  },
   {
    path: '/feedback',
    name: 'feedback',
    component: Feedback
  },
  {
    path: '/category',
    name: 'category',
    component: Category
  },
  {
    path: '/categorySet',
    name: 'categorySet',
    component: CategorySet
  },
  {
    path: '/addCategory',
    name: 'addCategory',
    component: AddCategory
  },
  {
    path: '/categoryEdit',
    name: 'categoryEdit',
    component: CategoryEdit
  },
  {
    path: '/addBookkeeping',
    name: 'addBookkeeping',
    component: AddBookkeeping
  },
  {
    path: '/accountList',
    name: 'accountList',
    component: AccountList
  },
  {
    path: '/addAccount',
    name: 'addAccount',
    component: AddAccount
  },
  {
    path: '/accountEdit',
    name: 'accountEdit',
    component: AccountEdit
  }, 
  {
    path: '/accountDetails',
    name: 'accountDetails',
    component: AccountDetails
  },
  {
    path: '/billDetails',
    name: 'billDetails',
    component: BillDetails
  },
  {
    path: '/billModify',
    name: 'billModify',
    component: BillModify
  },
  {
    path: '/billEdit',
    name: 'billEdit',
    component: BillEdit
  },
  {
    path: '/stay',
    name: 'stay',
    component: Stay
  },
  {
    path: '/addfollow',
    name: 'addfollow',
    component: Addfollow
  },
  {
    path: '/accountBook',
    name: 'accountBook',
    component: AccountBook
  },
  {
    path: '/addbook',
    name: 'addbook',
    component: Addbook
  },
  {
    path: '/bookDetails',
    name: 'bookDetails',
    component: BookDetails
  },
  {
    path: '/addmember',
    name: 'addmember',
    component: Addmember
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
