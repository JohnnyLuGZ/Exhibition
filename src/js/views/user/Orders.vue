<style type="text/css"></style>
<template>
    <div class="fixed-width mt-4">
        <heading class="block py-4">订单中心</heading>

        <card class="mt-2">
            <div class="card-title">查询</div>
            <div>
                <div
                    class="bg-gray-100 px-6 pb-4 flex flex-wrap"
                >
                    <label class="block w-1/4 px-4 pt-4">
                        <span class="text-gray-700">订单编号</span>
                        <input v-model="filters.number"
                            class="form-input mt-1 block w-full"
                            placeholder="订单编号"
                        />
                    </label>
                    <label class="block w-1/4 px-4 pt-4">
                        <span class="text-gray-700">展会名称</span>
                        <input v-model="filters.exhibition_name"
                            class="form-input mt-1 block w-full"
                            placeholder="展会名称"
                        />
                    </label>
                    <label class="block w-1/4 px-4 pt-4">
                        <span class="text-gray-700">展位名称</span>
                        <input
                            v-model="filters.exhibition_booth_name"
                            class="form-input mt-1 block w-full"
                            placeholder="展位名称"
                        />
                    </label>
                    <label class="block w-1/4 px-4 pt-4">
                        <span class="text-gray-700">付款识别码</span>
                        <input
                            v-model="filters.payment_identification_code"
                            class="form-input mt-1 block w-full"
                            placeholder="付款识别码"
                        />
                    </label>
                    <label class="block w-1/4 px-4 pt-4">
                        <span class="text-gray-700">订单状态</span>
                        <select
                            v-model="filters.status"
                            class="form-select mt-1 block w-full"
                        >
                            <option>所有</option>
                        </select>
                    </label>
                </div>
                <div class="p-4 flex justify-end">
                    <button @click.prevent="reset" class="btn btn-reset dim">重置</button>
                    <button @click.prevent="filter" class="btn dim">查询</button>
                </div>
            </div>
        </card>

        <card class="mt-5">
            <div class="card-title">订单列表</div>

            <div v-if="orders.any()" class="bg-gray-100 p-4">
                <div
                    v-for="(order, index) in orders.items()"
                    class="mb-4 shadow bg-white rounded-lg text-sm text-gray-700 overflow-hidden"
                >
                    <div
                        class="w-full flex items-center justify-between p-4"
                    >
                        <div class="w-1/6x flex flex-col">
                            <span
                                class="text-indigo-900 tracking-wider"
                                v-text="order.number"
                            />
                            <span class="font-bold text-xs">{{ order.status_text }}</span>
                        </div>
                        <div class="w-2/6x flex flex-col">
                            <span class="text-indigo-900 tracking-wider"
                                >{{ order.exhibition_booth.exhibition.name }}</span
                            >
                            <span class="font-bold text-xs"
                                >展位号：{{ order.exhibition_booth.name }}</span
                            >
                        </div>
                        <span
                            class="block w-1/6x text-red-600 font-bold"
                            >¥{{ order.price_in_yuan }}</span
                        >
                        <span
                            class="block w-1/6x"
                            v-text="order.created_at"
                        />
                        <div
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
                    <!-- 展开详情 -->
                    <!-- <transition name="fade"> -->
                    <div class="" v-if="openedIndex == index">
                        <table class="table text-center">
                            <thead class="bg-gray-100">
                                <tr>
                                    <th>订单类型</th>
                                    <th>商品名称</th>
                                    <th>规格</th>
                                    <th>单价</th>
                                    <th>押金</th>
                                    <th>费用优惠</th>
                                    <th>押金优惠</th>
                                    <th>购买数量</th>
                                    <th>小计</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="item in order.items"
                                    class="border-b border-gray-200"
                                >
                                    <td>{{ item.display_type }}</td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.specification_name || '无' }}</td>
                                    <td>¥{{ item.unit_price / 100 }}</td>
                                    <td>¥{{ item.deposit_in_yuan }}</td>
                                    <td>¥{{ item.discount / 100 }}</td>
                                    <td>¥{{ item.deposit_discount / 100 }}</td>
                                    <td>{{ item.quantity }}</td>
                                    <td>¥{{ item.price_in_yuan }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="bg-orange-200 text-center py-3 ">
                            <router-link class="text-orange-500 font-bold hover:underline" :to="`/rent?order_number=${order.number}`">继续水电展具租赁 »</router-link>
                        </div>
                        <div
                            class="p-4 bg-gray-100 flex items-center justify-around"
                        >
                            <span
                                >订单总计：<span
                                    class="text-red-600 font-bold"
                                    >¥{{ order.price_in_yuan }}</span
                                ></span
                            >
                            <router-link
                                class="dim font-bold"
                                :to="{
                                    name: 'orders.show',
                                    params: { number: order.number }
                                }"
                                target="_blank"
                                >查看详情</router-link
                            >
                        </div>
                    </div>
                    <!-- </transition> -->
                </div>
            </div>
            <div
                v-else
                class="bg-gray-100 py-10 text-center text-gray-500 text-sm"
            >
                暂无订单
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
                    {{ orders.total() }} 条订单
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
        filters: {},
        openedIndex: 0,
        orders: new Pagination("orders")
    }),

    created() {
        this.orders.getResources();

        if (this.$route.query.rent) {
            this.$toasted.show('请选择需要水电展具租赁的订单', { type: 'success' })
        }
    },

    methods: {
        reset() {
            this.filters = {}
        },

        filter() {
            //
        }
    }
};
</script>
