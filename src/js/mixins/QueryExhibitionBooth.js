export default {
    data: () => ({
        exhibitionBooth: null,
    }),

    methods: {
        queryExhibitionBooth(name) {
                axios.get(`exhibitions/${this.$store.getters.exhibition.id}/query-exhibition-booths?name=${name}`)
                    .then(response => {
                        this.exhibitionBooth = response.data
                        if (!response.data) {
                            this.$toasted.show('查询不到该展位信息', { type: 'danger' })
                        }
                    })
        }
    }
}
