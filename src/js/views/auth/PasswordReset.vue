<template>
    <div
        class="h-screen flex flex-col items-center justify-center"
        style="background-image: url('/dist/images/background-white.png'); background-size: cover;"
    >
        <div class="flex items-center">
            <img src="/dist/images/favicon.png" />
            <span class="ml-2 text-xl">会展系统</span>
        </div>

        <card
            class="mt-12 w-full sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-2/5"
        >
            <h2 class="py-5 text-center text-xl text-gray-800">
                重置密码
            </h2>

            <div class="bg-gray-100">
                <validation-errors :errors="form.errors"></validation-errors>
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
                                >验证码</span
                            >
                            <div
                                class="flex items-center justify-between mt-1 h-10"
                            >
                                <input
                                    v-model="form.captcha_value"
                                    type="text"
                                    class="form-input block w-full py-2"
                                    required
                                    placeholder="请输入右侧图片所示验证码"
                                />
                                <img
                                    @click="getCaptcha"
                                    class="cursor-pointer h-full ml-4 rounded-lg"
                                    :src="captcha.img"
                                />
                            </div>
                            <a
                                @click.prevent="sendVerificationCode"
                                class="dim block mt-2 text-sm text-blue-600"
                                href="#"
                                >发送验证码</a
                            >
                        </label>
                        <label class="block mt-4">
                            <span class="text-gray-700 text-sm"
                                >短信验证码</span
                            >
                            <input
                                v-model="form.verification_code"
                                type="text"
                                class="form-input mt-1 block w-full py-2"
                                required
                                placeholder="请输入接收到的短信验证码"
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
                                placeholder="请输入新密码"
                            />
                        </label>
                    </div>

                    <div class="bg-white py-4">
                        <div
                            class="flex items-center justify-between max-w-sm mx-auto"
                        >
                            <button class="btn dim">
                                重置
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </card>
        <div class="py-4 text-sm">
            <span
                ><router-link :to="{ name: 'login' }" class="dim"
                    >返回登录页面</router-link
                ></span
            >
        </div>
    </div>
</template>

<script>
import Form from "form-backend-validation";

export default {
    data: () => ({
        captcha: {},
        form: new Form([
            "phone",
            "verification_code",
            "password",
            "captcha_value"
        ])
    }),

    mounted() {
        this.getCaptcha();
    },

    methods: {
        getCaptcha() {
            axios
                .get("captcha")
                .then(response => (this.captcha = response.data));
        },

        submit() {
            this.form.post("password-reset").then(data => {
                this.$toasted.show("重置密码成功", { type: "success" });

                setTimeout(() => this.$router.push({ name: "login" }), 1000);
            });
        }
    }
};
</script>
