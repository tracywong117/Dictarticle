<template>
    <div class="input-container flex flex-col">
        <textarea v-model="content" class="styled-input h-[450px]" placeholder="Type your text here..."
            onfocus="this.parentElement.style.borderColor='#007BFF';"
            onblur="this.parentElement.style.borderColor='#ccc';"></textarea>
        <div class="flex justify-center">
            <button class="text-center border px-5 py-1 rounded-lg hover:border-purple-600" @click="setShowArticle">Get Result!</button>
        </div>
    </div>
</template>


<script>
import { useArticleStore } from '../stores/article.js';
import { toRefs } from 'vue';

export default {
    name: 'ArticleInputBox',
    setup() {
        const articleStore = useArticleStore();
        const articleState = toRefs(articleStore);

        return {
            ...articleState,
            callGroq: articleStore.callGroq
        };
    },
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
    methods: {
        setShowArticle(){
            console.log('show article');
            this.showArticle = true;
            this.articleAnswer = this.callGroq(this.content)
        }
    },

}
</script>

<style>
.input-container {
    /* Adjust width to accommodate padding */
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-sizing: border-box;
    /* Ensures padding is included in the total width */
    transition: border-color 0.3s;
    /* Smooth transition for border color */
}

.styled-input {
    width: 100%;
    border: none;
    /* Remove default border */
    padding: 5px 10px;
    resize: none;
    /* Prevents resizing by user */
    overflow-y: auto;
    /* Adds vertical scrollbar when content overflows */
    font-size: 16px;
    box-sizing: border-box;
    /* Ensures padding is included in the total width and height */
    background-color: #f9f9f9;
    /* Same background color as the container */
}

.styled-input:focus {
    outline: none;
    /* Removes default focus outline */
}

.styled-input:focus+.input-container {
    border-color: #007BFF;
    /* Changes border color of container on focus */
}
</style>