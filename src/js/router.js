import Vue from "vue";
import Router from "vue-router";
import store from "./store";
Vue.use(Router);

/**
 * View components.
 */
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import PasswordReset from "./views/auth/PasswordReset";
import Layout from "./views/Layout";
import Home from "./views/Home";
import Orders from "./views/Orders";
import MyOrders from "./views/user/Orders";
import MyInsurances from "./views/user/MyInsurances";
import OrderDetail from "./views/user/OrderDetail";

import SpecialDecoration from './views/user/SpecialDecoration';
import NewSpecialDecoration from './views/user/NewSpecialDecoration';
import NewSpecialDecorationGroup from './views/user/NewSpecialDecorationGroup';
import DecorationConfirm from './views/user/DecorationConfirm';
import FixedCost from './views/user/FixedCost';
import Rent from './views/rent/Index';
import Refund from './views/user/Refund';
import Invoice from  './views/user/Invoice';
import Insure from './views/user/Insure';

const router = new Router({
    mode: process.env.NODE_ENV == "production" ? "history" : "hash",
    routes: [
        {
            path: "/",
            component: Layout,
            children: [
                {
                    meta: { title: "首页" },
                    name: "home",
                    path: "/",
                    component: Home
                },
                {
                    meta: { title: "我的订单" },
                    name: "orders",
                    path: "/orders",
                    component: Orders
                },
                {
                    meta: { title: "主场订单" },
                    name: "my-orders",
                    path: "/my-orders",
                    component: MyOrders
                },
                {
                    meta: { title: "保险订单" },
                    name: "my-insurances",
                    path: "/my-insurances",
                    component: MyInsurances
                },
                {
                    meta: { title: "订单详情" },
                    name: "orders.show",
                    path: "/my-orders/:number",
                    props: true,
                    component: OrderDetail
                },
                {
                    meta: { title: '特装审图 '},
                    path: '/special-decoration',
                    component: SpecialDecoration
                },
                {
                    meta: { title: '特装审图须知 '},
                    path: '/special-decoration/new',
                    component: NewSpecialDecoration
                },
                {
                    meta: { title: '审图须知 '},
                    path: '/special-decoration/group',
                    component: NewSpecialDecorationGroup
                },
                {
                    meta: { title: "审图须知 - 展位信息确认" },
                    path: "/special-decoration/decoration-confirm",
                    component: DecorationConfirm
                },
                {
                    meta: { title: "特装审图 - 查看详情" },
                    path: "/special-decoration/decoration-detail",
                    component: require('./views/user/DecorationDetail')
                },
                {
                    meta: { title: "固定费用缴纳" },
                    path: "/fixed-cost",
                    component: FixedCost
                },
                {
                    meta: { title: "水电展具租赁" },
                    path: "/rent",
                    component: Rent
                },
                {
                    meta: { title: "押金退款申请" },
                    path: "/refund",
                    component: Refund
                },
                {
                    meta: { title: "发票开具申请" },
                    path: "/invoice",
                    component: Invoice
                },
                {
                    meta: { title: "保险购买" },
                    path: "/insure",
                    component: Insure
                }
            ]
        },
        {
            meta: { title: "登录" },
            name: "login",
            path: "/login",
            component: Login
        },
        {
            meta: { title: "注册" },
            name: "register",
            path: "/register",
            component: Register
        },
        {
            meta: { title: "密码重置" },
            name: "password-reset",
            path: "/password-reset",
            component: PasswordReset
        }
    ]
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} - 会展系统`;

    // 如果没有选择展会，则跳转到首页（首页会自动弹出展会选择界面）
    if (!store.getters.exhibitionId && to.name !== "home") {
        return next({ name: "home" });
    }
    // if (
    //  !store.state.auth.access_token &&
    //  !['login', 'register'].includes(to.name)
    // ) {
    //  return next({ name: 'login' })
    // }

    return next();
});

export default router;
