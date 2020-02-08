<template>
    <div class="fixed-width mt-4">
        <heading class="block py-4">水电家具租赁</heading>

        <card class="mb-8 p-4">
            <label class="block">
                <span class="text-gray-700">请选择您申请的展位</span>
                <select @change="selectOrder" class="form-select mt-1 block w-full">
                    <option selected disabled>请选择...</option>
                    <option v-for="order in orders" :value="order.number">{{ order.exhibition_booth.exhibition.name }} | {{ order.exhibition_booth.name }} | {{ order.exhibitor_name }}</option>
                    <option value="none">未申请展位？点击申请</option>
                </select>
            </label>
        </card>
        <card v-if="carts.length > 0" class="mb-8">
            <div class="px-8 py-4 font-bold">
                已选择的商品
            </div>
            <div class="">
                <table class="table text-center">
                    <thead class="bg-gray-200">
                        <tr>
                            <th class="w-4/12">商品名称</th>
                            <th class="w-1/12">单价</th>
                            <th class="w-2/12">规格</th>
                            <th class="w-1/12">数量</th>
                            <th class="w-2/12">押金</th>
                            <th class="w-2/12">小计</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cart in carts">
                            <td>{{ cart.name }}</td>
                            <td>{{ cart.current_price }}</td>
                            <td>{{ calculateSpecification(cart) }}</td>
                            <td class="select-none">
                                <div class="flex justify-center">
                                    <span class="cursor-pointer" @click="minusQuantity(cart)">-</span>
                                    <span class="px-2 text-lg">{{ cart.quantity || 1 }}</span>
                                    <span class="cursor-pointer" @click="addQuantity(cart)">+</span>
                                </div>
                            </td>
                            <td>¥{{ calculateDeposit(cart) / 100 }}</td>
                            <td>¥{{ cart.price ? cart.price / 100 : calculatePrice(cart) / 100 }}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="bg-gray-300 py-2 px-8 text-right">
                    <button @click="submit" class="btn dim">去支付</button>
                </div>
            </div>
        </card>
        <card v-if="$route.query.order_number" class="">
            <div class="px-4 py-2 flex items-center justify-between border-b">
                <div>
                    <button @click="selectedCategoryId = null" class="border border-blue-700 text-sm px-2 mr-2"
                        :class="selectedCategoryId == null ? 'bg-blue-600 text-white' : 'text-blue-700'"
                    >全部</button>
                    <button v-for="category in categories"
                        @click="selectedCategoryId = category.id"
                        class="border border-blue-700 text-sm px-2 mr-3 "
                        :class="selectedCategoryId == category.id ? 'bg-blue-600 text-white' : 'text-blue-700'"
                    >{{ category.name }}</button>
                </div>
                <div class="flex items-center">
                    <input v-model="keyword" class="form-input h-8" type="text" name="" placeholder="输入内容...">
                    <button @click="search" class="btn ml-2 py-1 px-3">搜索</button>
                </div>
            </div>

            <div class="text-center text-gray-700 text-sm mt-6" v-show="products && products.items().length == 0">
                <span>暂无内容</span>
            </div>
            <div v-if="products" class="py-4 flex flex-wrap">
                <div v-for="product in products.items()" class="w-1/4 px-5 py-2">
                    <div class="border rounded-lg overflow-hidden">
                        <img class="w-full" style="height: 150px;" :src="product.image_url">
                        <span class="block bg-blue-900 text-white px-3 py-1">{{ product.name }}</span>
                        <div class="text-sm py-3 px-2">
                            <div class="mb-1 flex items-center">
                                <span class="w-10 font-bold">租金</span>
                                <span v-if="product.specification_id">¥{{ product.current_price }}</span>
                                <span v-else>请选择规格</span>
                            </div>
                            <div class="mb-1 flex items-center">
                                <span class="w-10 font-bold">规格</span>
                                <select v-model="product.specification_id" @change="selectSpecification($event, product)" class="form-selectx block w-2/3">
                                    <option v-for="specification in product.specifications" :value="specification.id">{{ specification.name }}</option>
                                </select>
                            </div>
                            <div class="mb-1 flex items-center">
                                <span class="w-10 font-bold">单位</span>
                                <span>{{ product.unit }}</span>
                            </div>
                            <div class="text-right">
                                <button @click="addToCart(product)" class="btn text-xs px-3 py-1">加入租赁清单</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="products" class="flex items-center justify-between px-8 py-4 bg-gray-200 text-sm text-gray-800">
                <a
                    @click.prevent="products.prev()"
                    class="mx-1 dim"
                    href="#"
                    >上一页</a
                >
                <span class="text-xs">
                    当前 {{ products.currentPage() }} 页，共
                    {{ products.total() }} 个商品
                </span>
                <a
                    @click.prevent="products.next()"
                    class="mx-1 dim"
                    href="#"
                    >下一页</a
                >
            </div>
        </card>
    </div>
</template>

<script>
    import Pagination from '../../Pagination'
    import cloneDeep from 'lodash/cloneDeep'

    export default {
        data: () => ({
            keyword: null,
            categories: [],
            selectedCategoryId: null,
            orders: [],
            products: null,
            carts: [],
        }),

        watch: {
            selectedCategoryId(value) {
                this.products.getResources({ category_id: value })
            }
        },

        mounted() {
            this.getCategories()
            this.getOrders()
            this.products = new Pagination(`exhibitions/${this.$store.getters.exhibition.id}/products`)
            this.products.getResources()
        },

        methods: {
            search() {
                this.products.getResources({ keyword: this.keyword })
            },

            getOrders() {
                axios.get(`exhibitions/${this.$store.getters.exhibition.id}/orders`).then(response => this.orders = response.data)
            },

            getCategories() {
                axios.get('categories').then(response => this.categories = response.data)
            },

            selectOrder(e) {
                if (e.target.value == 'none') {
                    return this.$router.push({ path: '/fixed-cost' })
                }
                this.$router.push({ path: '/rent', query: { order_number: e.target.value }})
            },

            selectSpecification(e, product) {
                const items = this.products.items().map(item => {
                    if (item.id == product.id) {
                        item.current_price = item.specifications.find(i => i.id == e.target.value).price_in_yuan
                    }

                    return item
                })

                this.products.setItems(items)
            },

            addToCart(product) {
                if (!product.specification_id) {
                    return this.$toasted.show('请先选择规格', { type: 'danger' })
                }
                this.carts.push(cloneDeep(product))

                this.$toasted.show('成功加入租赁清单', { type: 'success' })
            },

            calculateSpecification(cart) {
                return cart.specifications.find(item => item.id == cart.specification_id).name
            },

            minusQuantity(cart) {
                if (cart.quantity < 1) return
                this.carts = this.carts.map(item => {
                    if (item.id == cart.id) {
                        item.quantity = item.quantity - 1
                        item.price = this.calculatePrice(item)
                    }
                    return item
                })
            },

            addQuantity(cart) {
                this.carts = this.carts.map(item => {
                    if (item.id == cart.id) {
                        item.quantity = (item.quantity || 1) + 1
                        item.price = this.calculatePrice(item)
                    }
                    return item
                })
            },

            calculateDeposit(cart) {
                return cart.specifications.find(item => item.id == cart.specification_id).deposit
            },

            calculatePrice(cart) {
                return (((cart.specifications.find(item => item.id == cart.specification_id).price) + this.calculateDeposit(cart)) * (cart.quantity || 1))
            },

            submit() {
                const form = this.carts.map(cart => {
                    return {
                        quantity: cart.quantity || 1,
                        product_id: cart.id,
                        product_specification_id: cart.specification_id,
                    }
                })

                axios.post('orders/' + this.$route.query.order_number, { rents: form }).then(() => this.$router.push('/my-orders/' + this.$route.query.order_number))
            }
        }
    }
</script>
