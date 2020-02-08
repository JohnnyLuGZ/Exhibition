<template>
    <div
        class="h-screen flex flex-col items-center pt-24"
        style="background-image: url('/dist/images/background-white.png'); background-size: cover;"
    >
        <router-link to="/" tag="div" class="flex items-center">
            <img src="/dist/images/favicon.png" />
            <span class="ml-2 text-xl">会展系统</span>
        </router-link>

        <card
            class="mt-12 w-full sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-2/5 overflow-y-scroll"
        >
            <h2 class="py-5 text-center text-xl text-gray-800">
                用户登录
            </h2>

            <div class="bg-gray-100">
                <form @submit.prevent="submit">
                    <div class="py-10 max-w-sm mx-auto">
                        <label class="block">
                            <span class="text-gray-700 text-sm"
                                >手机号码</span
                            >
                            <input
                                v-model="form.phone"
                                type="text"
                                class="form-input mt-1 block w-full py-2"
                                required
                                placeholder="请输入手机号码"
                            />
                        </label>
                        <label class="block mt-4">
                            <span class="text-gray-700 text-sm"
                                >密码</span
                            >
                            <input
                                v-model="form.password"
                                type="password"
                                class="form-input mt-1 block w-full py-2"
                                required
                                placeholder="请输入密码"
                            />
                        </label>
                    </div>

                    <div class="bg-white py-4">
                        <div
                            class="flex items-center justify-between max-w-sm mx-auto"
                        >
                            <button class="btn dim">
                                登录
                            </button>
                            <router-link
                                :to="{ name: 'password-reset' }"
                                class="text-sm dim"
                                >忘记密码</router-link
                            >
                        </div>
                    </div>
                </form>
            </div>
        </card>
        <div class="py-4 text-sm">
            <span
                >还没账号？<router-link :to="{ name: 'register' }" class="dim"
                    >立即注册</router-link
                ></span
            >
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        form: {
            phone: null,
            password: null
        }
    }),

    mounted() {
        // if (this.$store.state.auth.access_token) {
        //     const redirectPath = this.$route.query.redirect_path;

        //     redirectPath
        //         ? this.$router.push({ path: redirectPath })
        //         : this.$router.push({ name: "home" });
        // }
    },

    methods: {
        submit() {
            axios.post("login", this.form).then(response => {
                this.$store.commit("setCredentials", response.data);

                this.$toasted.show("登录成功", { type: "success" });
                const redirectPath = this.$route.query.redirect_path;

                redirectPath
                    ? this.$router.push({ path: redirectPath })
                    : this.$router.push({ name: "home" });
            });
        }
    }
};
</script>
