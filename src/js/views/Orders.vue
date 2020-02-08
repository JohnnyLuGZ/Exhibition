<template>
    <div class="my-48 container mx-auto">
        <div class="flex justify-center">
            <div
                class="w-64 rounded-lg px-4 bg-indigo-200 h-64 flex flex-col items-center justify-around"
                style="background-image: url('http://zhan.zzxes.com.cn/static/images/img_zcdd_bg.png');"
            >
                <span class="font-bold text-xl">主场订单</span>
                <p class="py-2">费用、押金、水电、展具租赁查询</p>
                <router-link
                    :to="{ name: 'my-orders' }"
                    class="bg-blue-600 px-6 py-2 rounded-full text-white text-sm dim"
                    >点击进入</router-link
                >
            </div>
            <div
                class="ml-12 w-64 rounded-lg px-4 bg-green-200 h-64 flex flex-col items-center justify-around"
                style="background-image: url('http://zhan.zzxes.com.cn/static/images/img_bxdd_bg.png');"
            >
                <span class="font-bold text-xl">保险订单</span>
                <p class="py-2">展位保险查询、保单下载</p>
                <router-link
                    :to="{ name: 'my-insurances' }"
                    class="bg-green-600 px-6 py-2 rounded-full text-white text-sm dim"
                    >点击进入</router-link
                >
            </div>
        </div>
    </div>
</template>
