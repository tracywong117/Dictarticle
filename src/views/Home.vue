<template>
    <div v-if="!showArticle" class="flex justify-center mt-10 items-center">
        <div class="w-1/2">
            <div class="text-center">
                <span class="text-3xl font-bold mb-5">
                    Get started by uploading a file <br>
                </span>
                <span class="text-2xl text-neutral-800">
                    or copy and paste your text
                </span>
            </div>
            <div class="text-center mt-5 flex justify-center items-center">
                <FileUpload></FileUpload>
            </div>
        </div>
        <div class="w-1/2">
            <!-- Add content for the second column here -->
            <div class="ml-[50px] mr-[50px]">
                <ArticleInputBox v-model="article"></ArticleInputBox>
            </div>
        </div>
    </div>
    <div v-if="showArticle">
    </div>

</template>

<script>
import ArticleInputBox from '../components/ArticleInputBox.vue'
import FileUpload from '../components/FileUpload.vue'
import { useArticleStore } from '../stores/article.js';
import { toRefs } from 'vue';

export default {
    setup() {
        const articleStore = useArticleStore();
        const articleState = toRefs(articleStore);

        return {
            ...articleState,

        };
    },
    components: {
        ArticleInputBox,
        FileUpload
    },
    data() {
        return {
        }
    },
    mounted() {
        fetch('../assets/prompt.txt')
            .then(promptResponse => {
                if (!promptResponse.ok) {
                    throw new Error(`Error loading prompt: ${promptResponse.statusText}`);
                }
                return promptResponse.text();
            })
            .then(content => {
                this.prompt = content;
            })
            .catch(error => {
                console.error('Failed to load the prompt:', error);
            });
    }
}
</script>

<style></style>