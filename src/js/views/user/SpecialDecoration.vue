<template>
    <div class="fixed-width mt-4">
        <div class="py-4 flex items-center justify-between">
            <heading class="block ">特装审图</heading>
            <button @click="$router.push({ path: '/special-decoration/new' })" class="btn">新增申请</button>
        </div>

        <card>
            <div class="card-title">特装审图申请记录</div>

            <div v-if="orders.any()" class="bg-gray-100 p-4">
                <div
                        v-for="(order, index) in orders.items()"
                        class="mb-4 shadow bg-white rounded-lg text-sm text-gray-700 overflow-hidden"
                >
                    <div
                            class="w-full flex items-center justify-between p-4"
                    >
                        <div class="w-2/6 flex flex-col">
                            <span class="text-indigo-900 tracking-wider"
                            >{{ order.exhibition_booth.exhibition.name }}</span
                            >
                        </div>
                        <span class="w-1/6 font-bold text-xs">展位号：{{ order.exhibition_booth.name }}</span>
                        <div class="w-2/6 flex flex-col">
                            <span
                                    class="text-indigo-900 tracking-wider"
                            >申请于：{{ order.created_at }}</span>
                        </div>
                        <span class="w-1/6 font-bold text-xs" v-text="order.status_text"></span>
                        <!-- <span class="w-1/6 text-xs"><router-link :to="{ path: '/special-decoration/decoration-detail', query: { id: order.id } }">查看详情</router-link></span> -->
                        <div
                        v-show="false"
                                @click="openedIndex = index"
                                class="cursor-pointer dim text-right w-1/6x"
                        >
                            <svg
                                    class="icon w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                            >
                                <g>
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path
                                            d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15zm-3.847-8.699a2 2 0 1 0 2.646 2.646 4 4 0 1 1-2.646-2.646z"
                                    />
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div
                    v-else
                    class="bg-gray-100 py-10 text-center text-gray-500 text-sm"
            >
                暂无特装审图记录
            </div>

            <div
                    class="flex items-center justify-between px-8 py-4 bg-gray-200 text-sm text-gray-800"
            >
                <a
                        @click.prevent="orders.prev"
                        class="mx-1 dim"
                        :class="{ 'cursor-not-allowed': !orders.hasPrev() }"
                        href="#"
                >上一页</a
                >
                <span class="text-xs">
                    当前 {{ orders.pageInfo() }} 页，共
                    {{ orders.total() }} 条记录
                </span>
                <a
                        @click.prevent="orders.next"
                        class="mx-1 dim"
                        :class="{ 'cursor-not-allowed': !orders.hasNext() }"
                        href="#"
                >下一页</a
                >
            </div>
        </card>
    </div>
</template>
<script>
import Pagination from "../../Pagination";

export default {
    data: () => ({
        openedIndex: 0,
        orders: new Pagination('member/special-decorations')
    }),

    created() {
        this.orders.getResources()

    },

    methods: {
    }
};
</script>
