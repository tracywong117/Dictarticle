<template>
    <div>
        {{ articleAnswer }}
    </div>
</template>

<script>

import { useArticleStore } from '../stores/article.js';
import { toRefs } from 'vue';

export default {
    name: 'Article',
    setup() {
        const articleStore = useArticleStore();
        const articleState = toRefs(articleStore);

        return {
            ...articleState,

        };
    },


</script>