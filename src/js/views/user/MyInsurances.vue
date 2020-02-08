<style type="text/css"></style>
<template>
    <div class="fixed-width mt-4">
        <heading class="block py-4">保险订单</heading>

        <card class="mt-2">
            <div class="card-title">查询</div>
            <div>
                <div
                    class="bg-gray-100 px-6 pb-4 flex flex-wrap"
                >
                    <label class="block w-1/4 px-4 pt-4">
                        <span class="text-gray-700">订单编号</span>
                        <input
                            class="form-input mt-1 block w-full"
                            placeholder="订单编号"
                        />
                    </label>
                    <label class="block w-1/4 px-4 pt-4">
                        <span class="text-gray-700">展会名称</span>
                        <input
                            class="form-input mt-1 block w-full"
                            placeholder="展会名称"
                        />
                    </label>
                    <label class="block w-1/4 px-4 pt-4">
                        <span class="text-gray-700">展位名称</span>
                        <input
                            class="form-input mt-1 block w-full"
                            placeholder="展位名称"
                        />
                    </label>
                    <label class="block w-1/4 px-4 pt-4">
                        <span class="text-gray-700">保单编号</span>
                        <input
                            class="form-input mt-1 block w-full"
                            placeholder="保单编号"
                        />
                    </label>
                    <label class="block w-1/4 px-4 pt-4">
                        <span class="text-gray-700">订单状态</span>
                        <select
                            class="form-select mt-1 block w-full"
                        >
                            <option>所有</option>
                        </select>
                    </label>
                    <label class="block w-1/4 px-4 pt-4">
                        <span class="text-gray-700">开始时间</span>
                        <input
                            class="form-input mt-1 block w-full"
                            placeholder="开始时间"
                        />
                    </label>
                    <label class="block w-1/4 px-4 pt-4">
                        <span class="text-gray-700">结束时间</span>
                        <input
                            class="form-input mt-1 block w-full"
                            placeholder="结束时间"
                        />
                    </label>
                </div>
                <div class="p-4 flex justify-end">
                    <button class="btn btn-reset dim">重置</button>
                    <button class="btn dim">查询</button>
                </div>
            </div>
        </card>

        <card class="mt-5">
            <div class="card-title">保险订单列表</div>

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
                            >¥{{ order.price/100 }}</span
                        >
                        <span
                            class="block w-1/6x"
                            v-text="order.created_at"
                        />
                    </div>
                    <!-- 展开详情 -->
                    <!-- <transition name="fade"> -->
                    <div class="">
                        <table class="table text-center">
                            <thead class="bg-gray-100">
                                <tr>
                                    <th>保险名称</th>
                                    <th>购买数量</th>
                                    <th>单价</th>
                                    <th>小计</th>
                                    <th>状态</th>
                                    <th>保单号码</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    class="border-b border-gray-200"
                                >
                                    <td>{{ order.name }}</td>
                                    <td>{{ order.quantity }}</td>
                                    <td>¥{{ order.unit_price / 100 }}</td>
                                    <td>¥{{ order.price / 100 }}</td>
                                    <td>{{ order.status_text }}</td>
                                    <td>{{ order.policy_number ? order.policy_number : '暂无' }}</td>
                                    <td>
                                        <div v-if="order.policy_number">
                                            <button @click="download(order)" class="btn px-1 py-0 text-xs rounded-none bg-green-700">下载</button>
                                        </div>
                                        <div v-else>
                                            -
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
        openedIndex: 0,
        orders: new Pagination("insurances")
    }),

    mounted() {
        this.orders.getResources();
    },

    methods: {
        download(order) {
            window.location.href = order.policy_path
        }
    }
};
</script>
