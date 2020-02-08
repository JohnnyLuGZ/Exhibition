<template>
    <div class="fixed-width mt-4">
        <heading class="block py-4">押金退款申请</heading>

        <div v-if="true" class="py-4">
            <div class="bg-yellow-200 border border-yellow-400 px-8 py-5 rounded-lg shadow-lg">
                <span class="block font-bold text-xl">注意</span>
                <div class="text-sm px-8 py-2">
                    <ul class="list-decimal leading-relaxed">
                        <li>当前显示为自己下单（非现场缴费）包含押金并且可以申请的订单</li>
                        <li>可申请的订单需同时满足以下几个条件：<span class="text-red-600 font-bold">未申请过、已到押金退还申请时间</span></li>
                        <li>如已满足第二点所有条件且不再已申请的押金之列，仍无法申请押金请咨询主场服务人员</li>
                    </ul>
                </div>
            </div>
        </div>

        <div v-else class="py-4">
            <div class="bg-yellow-200 border border-yellow-400 px-8 py-5 rounded-lg shadow-lg">
                <span class="block font-bold text-xl">你还没有可以申请订单的押金！</span>
                <div class="text-sm px-8 py-2">
                    <ul class="list-decimal leading-relaxed">
                        <li>当前显示为自己下单（非现场缴费）包含押金并且可以申请的订单</li>
                        <li>可申请的订单需同时满足以下几个条件：未申请过、已到押金退还申请时间</li>
                        <li>如已满足第二点所有条件且不再已申请的押金之列，仍无法申请押金请咨询主场服务人员</li>
                    </ul>
                </div>
            </div>
        </div>

        <card class="mt-4">
            <div class="card-title">我申请的展位</div>

            <table class="table text-center">
                <thead class="bg-gray-200">
                    <tr>
                        <th>订单号</th>
                        <th>展位名称</th>
                        <th>订单时间</th>
                        <th>押金金额</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orders">
                        <td>
                            <router-link class="text-blue-700" :to="`/my-orders/${order.number}`">{{ order.number }}</router-link>
                        </td>
                        <td>{{ order.exhibition_booth.exhibition.name }}</td>
                        <td>{{ order.created_at }}</td>
                        <td class="text-red-600 font-bold">¥{{ order.deposit_in_yuan }}</td>
                        <td>{{ order.deposit_status_text }}</td>
                        <td>
                            <div v-if="order.can_apply_deposit_refund">
                                <button @click="apply(order)" class="btn px-1 py-0 rounded-none">申请</button>
                            </div>
                            <div v-else>
                                -
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </card>
    </div>
</template>

<script>
    export default {
        data: () => ({
            orders: []
        }),

        mounted() {
            this.getResources()
        },

        methods: {
            getResources() {
                axios.get('orders?without_pagination').then(response => this.orders = response.data)
            },

            apply(order) {
                axios.post(`orders/${order.number}/apply-deposit-refund`).then(() => {
                    alert('已提交审核')
                    window.location.reload()
                })
            }
        }
    }
</script>
