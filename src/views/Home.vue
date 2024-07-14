<template>
  <div class="flex flex-col sm:flex-row justify-center mt-10 items-center">
    <div class="w-full sm:w-1/2">
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
    <div class="w-full sm:w-1/2 mt-10 sm:mt-0">
      <!-- Add content for the second column here -->
      <div class="mx-5 sm:mx-[50px]">
        <ArticleInputBox v-model="article"></ArticleInputBox>
      </div>
    </div>
  </div>

</template>

<script>
import ArticleInputBox from '../components/ArticleInputBox.vue'
import FileUpload from '../components/FileUpload.vue'
import { useArticleStore } from '../stores/article.js'
import { toRefs } from 'vue'

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
    FileUpload,
  },
  data() {
    return {
    }
  },
  mounted() {
    this.prompt = `\
You are expert of teaching English learner whom first language is Chinese. Your task is to translate the difficult English Vocabulary into Traditional Chinese 繁體中文 and output the translation directly in the paragraph. The translation format is [difficult_vocab](繁體中文翻譯).

[Input]
The problem has forced police [jurisdictions](司法權) across the country to issue public [bulletins](新聞快報) on how to protect vehicles from theft.
=====

[Output] 
{
The problem has forced police [jurisdictions](司法權) across the country to issue public [bulletins](新聞快報) on how to protect vehicles from theft.
}

[Input]
Australia has appointed a special envoy to combat antisemitism and preserve "social cohesion", amid rising community tension over the Israel-Gaza war.
Prime Minister Anthony Albanese announced lawyer and businesswoman Jillian Segal would consult with community leaders and discrimination experts to advise the government.
It follows in the footsteps of countries like the US, Canada, Greece and the UK, which have all had similar positions for years.
A special envoy for addressing Islamophobia will also be appointed soon, Mr Albanese added.

[Output]
{
Australia has appointed a special [envoy](特使) to combat [antisemitism](反猶太主義) and preserve "[social cohesion](社會凝聚力)" , amid rising community tension over the Israel-Gaza war.
Prime Minister Anthony Albanese announced lawyer and businesswoman Jillian Segal would consult with community leaders and [discrimination](歧視) experts to advise the government.
It follows in the footsteps of countries like the US, Canada, Greece and the UK, which have all had similar [positions](職位) for years.
A special [envoy](特使) for addressing [Islamophobia](伊斯蘭恐懼症) will also be appointed soon, Mr Albanese added.
}\
        `
  }
}
</script>

<style></style>