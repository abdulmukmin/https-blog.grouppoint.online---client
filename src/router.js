import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'articles',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "article" */ './views/Article.vue'),
      children: [
        {
        path: 'articles/:id',
        component: () => import(/* webpackChunkName: "detail" */ './views/ArticleDetail.vue'),
      }]
    },
    {
      path: '/myarticles',
      name: 'myarticles',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "myArticle" */ './views/MyArticle.vue'),
      children: [{
        path: 'chatroom',
        component: () => import(/* webpackChunkName: "detail" */ './views/ChatWidget.vue'),
      },{
        path: 'newarticle',
        component: () => import(/* webpackChunkName: "articleEditor" */ './components/articles/articleEditorNew.vue'),
      },{
        path: 'listarticles',
        component: () => import(/* webpackChunkName: "myArticleList" */ './components/articles/myArticleList.vue'),
      },{
        path: 'listcomment',
        component: () => import(/* webpackChunkName: "myCommentList" */ './components/articles/myCommentList.vue'),
      },
      // {
      //   path: 'changePassword',
      //   component: () => import(/* webpackChunkName: "myCommentList" */ './components/articles/changePassword.vue'),
      // },
      {
        path: 'editarticle/:id',
        component: () => import(/* webpackChunkName: "myCommentList" */ './components/articles/articleEditorEdit.vue'),
      },{
        path: 'advertise',
        component: () => import(/* webpackChunkName: "myCommentList" */ './components/articles/myAdvertiseList.vue'),
      }]
    },
  ]
})
