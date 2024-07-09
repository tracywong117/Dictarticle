import { defineStore } from 'pinia';

export const useArticleStore = defineStore('articleStore', {
    state: () => ({
        article: null,

    }),
});