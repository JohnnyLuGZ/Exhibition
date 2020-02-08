import Vue from 'vue'
import axios from 'axios'
import Loader from './Loader'
import store from './store'
import router from './router'

export default class Http {
    constructor() {
        this.axios = axios.create()
    }

    create() {
        this.axios.defaults.baseURL =
            process.env.NODE_ENV == 'production'
                ? 'https://exhibition-production.larastage.com/api'
                : 'http://exhibition.larastage.com.test/api'

        this.axios.defaults.headers.common['X-Requested-With'] =
            'XMLHttpRequest'

        this.setUpInterceptors()

        return this.axios
    }

    setUpInterceptors() {
        this.axios.interceptors.request.use(
            config => {
                config.headers.Authorization = 'Bearer ' + store.state.auth.access_token
                Loader.show()

                return config
            },
            error => {
                Loader.hide()

                return Promise.reject(error)
            }
        )

        this.axios.interceptors.response.use(
            response => {
                Loader.hide()

                return response
            },
            error => {
                if (error.response.data instanceof Blob) {
                    // Casts to json.
                    error.response.data.text().then(text => {
                        Vue.toasted.show(JSON.parse(text).message, {
                            type: 'danger'
                        })
                    })
                }

                Loader.hide()

                const statusCode = error.response.status

                if (statusCode === 401) {
                    Vue.toasted.show('当前操作需要登录，请先登录', {
                        type: 'error'
                    })

                    store.dispatch('flush').then(() => {
                        router.push({
                            name: 'login',
                            query: {
                                redirect_path: router.currentRoute.fullPath
                            }
                        })
                    })
                }

                if (statusCode === 422) {
                    Vue.toasted.show('请完善表单内容再提交', {
                        type: 'error'
                    })
                }

                if ([403, 500].includes(statusCode)) {
                    Vue.toasted.show(error.response.data.message, {
                        type: 'error'
                    })
                }

                return Promise.reject(error)
            }
        )
    }
}
