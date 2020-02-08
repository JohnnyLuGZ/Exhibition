<template>
    <style type="text/css">
        th,td { padding: 10px 0; }
        .fixed-width { width: 1024px; margin-left: auto; margin-right: auto; position: relative; }
        .min-width { min-width: 1024px; }
        .border-t-blue { border-color: #0082D2; }
        .bg-blue-action { background-color: #0082D2; }
        .bg-blue-hotlink { background-color: #E6F3FF; }
        .text-blue { color: #0082D2; }
    </style>

    <div>
        <!-- new header: start -->
        <div class="bg-white border-solid border-t-2 border-t-blue min-width w-full">
            <div class="w-full">
                <header class="flex fixed-width items-center justify-between py-4">
                    <!-- logo -->
                    <router-link :to="{ name: 'home' }" class="flex flex-initial items-center dim">
                        <img src="/dist/images/favicon.png" />
                        <h2 class="ml-2 font-bold">会展管理</h2>
                    </router-link>
                    <!-- menu -->
                    <ul class="flex flex-auto flex-row mr-4 text-blue-700 font-bold justify-end">
                        <router-link :to="{ name: 'home' }" tag="li" class="cursor-pointer mr-4 hover:opacity-75">首页</router-link>
                        <!-- <router-link
                            :to="{}"
                            tag="li"
                            class="cursor-pointer mr-4 hover:opacity-75"
                            >我的申请</router-link
                        > -->
                        <router-link :to="{ name: 'my-orders' }" tag="li" class="cursor-pointer mr-4 hover:opacity-75">我的订单</router-link>
                        <router-link :to="{}" tag="li" class="cursor-pointer mr-4 hover:opacity-75">我的服务</router-link>
                        <router-link :to="{}" tag="li" class="cursor-pointer mr-4 hover:opacity-75">使用指南</router-link>
                    </ul>
                    <!-- login -->
                    <div class="flex text-sm" style="flex: 0 0 auto;">
                        <div v-if="isSignedIn">
                        <span class="font-bold mr-2">{{member.name ? member.name : member.phone}}</span>
                            <a @click.prevent="logout" class="dim" href="#">退出登录</a>
                        </div>
                        <div v-else>
                            <router-link class="dim" :to="{name: 'login', query: {redirect_path: $router.currentRoute.fullPath}}">登录</router-link>
                            <router-link class="dim ml-1" :to="{ name: 'register' }">注册</router-link>
                        </div>
                    </div>
                </header>
            </div>
            <div class="bg-blue-hotlink w-full">
                <ul class="fixed-width flex flex-row items-center">
                    <li>
                        <div class="flex flex-row items-center text-sm">
                            <span class="text-black">当前选择: </span>
                            <span class="ml-4 text-blue">{{ exhibition && exhibition.name }}</span>
                            <button @click="showSelectExhibitionModal" class="bg-blue-action cursor-pointer ml-4 my-2 px-4 py-2 rounded text-sm text-white">切换展位</button>
                        </div>
                    </li>
                    <li class="ml-4 text-blue">
                        <div class="flex flex-row text-sm">
                            <span>时程安排: </span>
                            <div class="ml-4">
                                <span>2019.09.10</span>
                                <span> - </span>
                                <span>2019.10.20</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- new header: end -->

        <div>
            <transition enter-active-class="animated fadeIn faster">
                <router-view></router-view>
            </transition>
        </div>

        <modal name="exhibition-switcher" width="500px" height="auto">
            <div>
                <h3 class="text-xl px-6 pt-5">切换展会</h3>
                <div class="p-4">
                    <input v-model="search" class="form-input w-full" type="text" placeholder="输入名称查找" />
                </div>
                <ul class="px-8 text-gray-700 h-64 overflow-auto">
                    <li @click="selectExhibition(exhibition)" class="dim cursor-pointer py-4 border-b flex justify-between" v-for="exhibition in searchableExhibitions">{{ exhibition.name }}
                        <svg class="icon w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g>
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M12 11V8l4 4-4 4v-3H8v-2h4zm0-9c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8z" />
                            </g>
                        </svg>
                    </li>
                </ul>
            </div>
        </modal>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    data: () => ({
        search: '',
        exhibitions: []
    }),

    mounted() {
        this.getExhibitionInfo()

        if (!this.$store.getters.exhibitionId) {
            this.showSelectExhibitionModal()
        }
    },

    computed: {
        ...mapGetters(['exhibition', "member", "isSignedIn"]),

        searchableExhibitions() {
            return this.exhibitions.filter(exhibition => {
                return exhibition.name.toLowerCase().indexOf(this.search) !== -1
            })
        }
    },

    methods: {
        getExhibitions() {
            return axios
                .get('exhibitions')
                .then(response => (this.exhibitions = response.data))
        },

        selectExhibition(item) {
            this.$modal.hide('exhibition-switcher')

            this.getExhibitionInfo(item.id).then(() => {
                //
            })
        },

        getExhibitionInfo(exhibitionId) {
            let requestId = ''

            if (exhibitionId) {
                requestId = exhibitionId
            } else {
                requestId = this.$store.getters.exhibitionId
                    ? this.$store.getters.exhibitionId
                    : ''
            }

            return axios
                .get(`exhibitions/info?exhibition_id=${requestId}`)
                .then(response =>
                    this.$store.commit('setExhibition', response.data)
                )
        },

        showSelectExhibitionModal() {
            this.getExhibitions().then(() => {
                this.$modal.show('exhibition-switcher')
            })
        },

        logout() {
            this.$store.dispatch("flush");
        }
    }
};
</script>
