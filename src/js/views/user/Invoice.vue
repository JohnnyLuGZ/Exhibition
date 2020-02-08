<template>
    <div class="fixed-width mt-4">
        <heading class="block py-4">{{ $store.getters.exhibition.name }} - 申请发票</heading>

        <div class="py-4">
            <div class="bg-yellow-200 border border-yellow-400 px-8 py-5 rounded-lg shadow-lg">
                <span class="block font-bold text-xl">请仔细阅读以下条款</span>
                <div class="text-sm px-8 py-2">
                    <ul class="list-decimal leading-relaxed">
                        <li>搭建商与参展商一定要在布展期间在线上确认好需要我公司开具的发票内容</li>
                        <li>我公司开出的发票统一为二联《增值税<span class="text-red-600 font-bold">普通</span>发票》如需开具三联《增值税<span class="text-red-600 font-bold">专用</span>发票》请在线上事先准确无误的登记好开票资料后，我公司将于<span class="text-red-600 font-bold">1-2个月</span>后开出快递给到贵公司</li>
                        <li>各项费用合计<span class="text-red-600 font-bold">低于1000元以下</span>的，我公司只开具《普通发票》，不提供《增值税专用发票》</li>
                        <li>一个公司发票抬头只开具<span class="text-red-600 font-bold">一张</span>发票，请在<span class="text-red-600 font-bold">同一时段</span>提交发票申请，以便我司进行开票金额的合并。</li>
                        <li>以下费用由我公司提供发票：<span class="text-red-600 font-bold">水、电、气费、管理费、审图费、展具租赁费、施工证、加班费</span>，此费用在我公司开具发票</li>
                        <li>认真核对开票名称、金额是否正确，如发现错误请及时与主场相关人员联系</li>
                        <li>开票内容：<span class="text-red-600 font-bold">*会展服务*展览服务费</span></li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="mt-8 shadow-lg">
            <div class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 rounded-t-lg" role="alert">
                <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                <p>发票申请</p>
            </div>
            <div class="bg-gray-100 rounded-b-lg overflow-hidden">
                <div class="w-full flex flex-wrap mt-4 mb-4">
                    <label class="block w-full px-4 mb-4 flex items-center">
                        <div class="w-1/3 flex items-center">
                            <div>
                                <span class="text-gray-700 text-sm"><span class="text-red-600 font-bold">*</span>查询展位号</span>
                            </div>
                            <div class="mx-2">
                                <input v-model="boothName" class="form-input mt-1 block w-full" placeholder="请输入展位号" />
                            </div>
                            <div>
                                <button @click.prevent="queryExhibitionBooth(boothName)" class="btn">查询</button>
                            </div>
                        </div>
                        <div v-if="exhibitionBooth" class="ml-3">
                            <span>已选择的展位：{{ exhibitionBooth.name }}</span>
                        </div>
                    </label>
                    <label class="block w-1/3 px-4 mb-4">
                        <span class="text-gray-700 text-sm">发票类型</span>
                        <select v-model="form.invoice_type" class="form-select mt-1 block w-full">
                            <option value="normal">普通发票</option>
                            <option value="special">增值税专用发票</option>
                        </select>
                    </label>
                    <label class="block w-1/3 px-4 mb-4">
                        <span class="text-gray-700 text-sm"><span class="text-red-600 font-bold">*</span>发票抬头</span>
                        <input v-model="form.title" class="form-input mt-1 block w-full" placeholder="请填写发票抬头" />
                    </label>
                    <label class="block w-1/3 px-4 mb-4">
                        <span class="text-gray-700 text-sm">开票税号</span>
                        <input v-model="form.taxpayer_number" class="form-input mt-1 block w-full" placeholder="开票税号" />
                    </label>
                    <label v-show="form.invoice_type == 'special'" class="block w-1/2 px-4 mb-4">
                        <span class="text-gray-700 text-sm"><span class="text-red-600 font-bold">*</span>开户行</span>
                        <input v-model="form.bank" class="form-input mt-1 block w-full" placeholder="请填写开户行" />
                    </label>
                    <label v-show="form.invoice_type == 'special'" class="block w-1/2 px-4 mb-4">
                        <span class="text-gray-700 text-sm">银行账号</span>
                        <input v-model="form.bank_account" class="form-input mt-1 block w-full" placeholder="银行账号" />
                    </label>
                    <label class="block w-1/3 px-4 mb-4">
                        <span class="text-gray-700 text-sm"><span class="text-red-600 font-bold">*</span>姓名</span>
                        <input v-model="form.addressee" class="form-input mt-1 block w-full" placeholder="姓名" />
                    </label>
                    <label class="block w-1/3 px-4 mb-4">
                        <span class="text-gray-700 text-sm"><span class="text-red-600 font-bold">*</span>电话</span>
                        <input v-model="form.addressee_phone" class="form-input mt-1 block w-full" placeholder="联系电话" />
                    </label>
                    <label class="block w-2/3 px-4 mb-4">
                        <span class="text-gray-700 text-sm"><span class="text-red-600 font-bold">*</span>邮寄地址</span>
                        <input v-model="form.address" class="form-input mt-1 block w-full" placeholder="请输入邮寄地址" />
                    </label>
                    <div class="w-full px-4 mb-4">
                        <span class="text-gray-700 text-sm">备注</span>
                        <textarea v-model="form.member_remark" class="form-textarea mt-1 block w-full" rows="4" placeholder="备注信息"></textarea>
                    </div>
                </div>
                <div v-if="exhibitionBooth" class="bg-gray-200 px-8 py-3">
                    <button @click.prevent="submit" class="btn">提交申请</button>
                </div>
            </div>
        </div>

        <div class="mt-8 shadow-lg">
            <div class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 rounded-t-lg" role="alert">
                <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                <p>申请记录</p>
            </div>
            <div class="bg-gray-100 rounded-b-lg overflow-hidden">
                <table class="table text-center">
                    <thead class="bg-gray-200">
                        <tr>
                            <th class="w-2/12">申请编号</th>
                            <th class="w-2/12">申请日期</th>
                            <th class="w-2/12">发票类型</th>
                            <th class="w-2/12">展会</th>
                            <th class="w-2/12">状态</th>
                            <th class="w-2/12">其他</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="invoice in invoices">
                            <td>{{ invoice.number }}</td>
                            <td>{{ invoice.created_at }}</td>
                            <td>{{ invoice.type_text }}</td>
                            <td class="flex flex-col text-sm">
                                <span>{{ invoice.exhibition_booth.exhibition.name }}</span>
                                <span class="text-xs">{{ invoice.exhibition_booth.name }}</span>
                            </td>
                            <td class="">
                                {{ invoice.status_text }}
                            </td>
                            <td>
                                <span class="text-xs text-red-600" v-show="invoice.reject_reason">拒绝理由：{{ invoice.reject_reason }}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import QueryExhibitionBooth from '../../mixins/QueryExhibitionBooth'

    export default {
        mixins: [QueryExhibitionBooth],

        data: () => ({
            boothName: null,
            invoices: [],
            form: {
                invoice_type: 'normal',
            },
        }),

        mounted() {
            this.getInvoices()
        },

        methods: {
            getInvoices() {
                axios.get(`invoices`).then(response => this.invoices = response.data)
            },

            submit() {
                axios.post(`exhibitions/${this.$store.getters.exhibition.id}/invoices`, { ...this.form, exhibition_booth_id: this.exhibitionBooth.id })
                    .then(() => {
                        window.location.reload()
                    })
            }
        }
    }
</script>
