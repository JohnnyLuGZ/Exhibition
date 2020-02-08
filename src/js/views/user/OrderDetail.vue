<template>
    <div class="fixed-width my-4">
        <heading class="block py-4">订单详情</heading>

        <card class="mt-2" v-if="order">
            <div class="card-title">订单信息</div>

            <div
                class="bg-blue-600 px-4 py-2 text-blue-100 text-xs flex justify-between"
            >
                <span
                    >订单号：<span class="font-bold"
                        >{{ order.number }}</span
                    ></span
                >
                <span
                    >下单时间：<span class="font-bold"
                        >{{ order.created_at }}</span
                    ></span
                >
            </div>
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
            <div
                class="flex flex-wrap leading-relaxed p-4 bg-gray-100 text-sm"
            >
                <div class="w-1/4">
                    <span
                        >订单状态：<span class="font-bold text-lg"
                            >{{ order.status_text }}</span
                        ></span
                    >
                </div>
                <div class="w-1/4">
                    <span
                        >订单总计：<span class="text-red-700 font-bold"
                            >¥{{ order.price_in_yuan }}</span
                        ></span
                    >
                </div>
                <div class="w-1/4">
                    <span
                        >押金：<span class="text-red-700 font-bold"
                            >¥{{ order.deposit_in_yuan }}</span
                        ></span
                    >
                </div>
                <div class="w-1/4">
                    <span
                        >参展商：<span class="text-gray-700 font-bold"
                            >{{ order.exhibitor_name }}</span
                        ></span
                    >
                </div>
                <div class="w-1/4">
                    <span
                        >展位：<span class="text-gray-700 font-bold"
                            >{{ order.exhibition_booth.name }}</span
                        ></span
                    >
                </div>
                <div class="w-1/4">
                    <span>
                        现场负责人：
                        <span class="text-gray-700 font-bold"
                            >{{ order.contact_name }} {{ order.contact_phone }}</span
                        >
                    </span>
                </div>
                <div class="w-full">
                    <span
                        >订单备注：<span class="text-gray-700 font-bold"
                            >{{ order.remark }}</span
                        ></span
                    >
                </div>
            </div>
        </card>

        <card class="mt-4" v-if="order">
            <div class="card-title">付款指引</div>

            <div
                class="bg-red-100 border-t-4 border-b-4 border-dashed border-red-200"
            >
                <div class="flex items-center justify-around p-4">
                    <div class="">
                        <span class="font-bold">线下汇款指定账号</span>
                        <ul class="text-sm text-gray-900 mt-2">
                            <li>开户行：中国银行深圳福田支行营业部</li>
                            <li>开户单位：中国银行深圳福田支行营业部</li>
                            <li>银行账号：123123123123</li>
                        </ul>
                    </div>
                    <div class="">
                        付款识别码：<span
                            class="underline font-bold text-red-700"
                            >{{ order.payment_identification_code }}</span
                        >
                    </div>
                </div>
            </div>

            <div class="bg-gray-100 p-8">
                <h3 class="text-red-600 font-bold">
                    注意事项：汇款时需要注意以下信息，请牢记！
                </h3>
                <ul
                    class="list-decimal text-sm leading-relaxed px-8 py-2"
                >
                    <li>
                        请将待支付款项在2019-08-01 00:00
                        前通过银行汇到以上指定账号，请您尽快汇清款项，逾期订单将自动取消。
                    </li>
                    <li>
                        请将待支付款项在2019-08-01 00:00
                        前通过银行汇到以上指定账号，请您尽快汇清款项，逾期订单将自动取消。
                    </li>
                    <li>
                        请将待支付款项在2019-08-01 00:00
                        前通过银行汇到以上指定账号，请您尽快汇清款项，逾期订单将自动取消。
                    </li>
                    <li>
                        请将待支付款项在2019-08-01 00:00
                        前通过银行汇到以上指定账号，请您尽快汇清款项，逾期订单将自动取消。
                    </li>
                    <li>
                        请将待支付款项在2019-08-01 00:00
                        前通过银行汇到以上指定账号，请您尽快汇清款项，逾期订单将自动取消。
                    </li>
                </ul>
                <h3 class="text-red-600 font-bold">
                    汇款申请单填写示意图：为了您顺利的完成线下汇款，请在汇款用途一栏中正确的填写付款识别码
                </h3>
                <div class="mt-2">
                    <img
                        class="w-full"
                        src="http://zhan.zzxes.com.cn/static/images/remit_code_view.png"
                    />
                </div>
            </div>
        </card>
    </div>
</template>

<script>
export default {
    props: ["number"],

    data: () => ({
        order: null
    }),

    mounted() {
        axios
            .get(`orders/${this.number}`)
            .then(response => (this.order = response.data));
    }
};
</script>
