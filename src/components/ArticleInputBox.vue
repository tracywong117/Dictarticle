<template>
    <div>
        <el-input v-model="content" placeholder="請輸入文章"></el-input>
    </div>
</template>

<script>
import { ElInput } from 'element-plus';
export default {
    name: 'ArticleInputBox',
    data() {
        return {
            content: ''
        }
    },
    props: {
        modelValue: {
            type: String,
            required: true
        }
    },
    watch: {
        modelValue(newValue) {
            this.content = newValue;
            this.$emit('update:modelValue', this.content);
        },
    },
    components: {
        ElInput
    },
    methods: {

    },

}
</script>