<template>
    <div class="fixed-width mt-4">
        <div class="bg-white p-6 border rounded-lg">
            <div class="text-center">
                <h3 class="text-xl font-bold">主场服务群</h3>
            </div>
            <p>
                lkjasdlfjkasldkjflasjdflkjasldfjlasjdfljslajkfdlsdfsadfsadfsdafsadfasdfasdfsdf
            </p>
            <div class="flex justify-center mt-6">
                <label class="flex items-center">
                    <input v-model="checked" type="checkbox" class="form-checkbox">
                    <span class="ml-2">已知悉</span>
                </label>
                <button @click="next" class="btn px-3 py-1">下一步</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            checked: false,
        }),

        methods: {
            next() {
                if (this.checked) {
                    return this.$router.push({ path: '/special-decoration/decoration-confirm' })
                }
            }
        }
    }
</script>