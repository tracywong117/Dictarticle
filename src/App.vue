<template>
  <div id="app">
    <ArticleInputBox v-model="article"></ArticleInputBox>
  </div>
</template>

<script>
import ArticleInputBox from './components/ArticleInputBox.vue'
import { useArticleStore } from './stores/article.js';
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
    ArticleInputBox
  },
  data() {
    return {
    }
  }
}
</script>

<style>

</style>
