<template>
    <div v-if="errors.any()" class="bg-red-100 border-t-2 border-b-2 border-dashed border-red-200 py-4 px-8 text-red-700">
        <ul class="list-disc px-8">
            <li v-for="list in lists">{{ list }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['errors'],

        computed: {
            lists() {
                let lists = []

                Object.values(this.errors.all()).forEach(errors => {
                    if (Array.isArray(errors)) {
                        errors.forEach(error => lists.push(error))
                    }
                })

                return lists
            }
        }
    }
</script>
