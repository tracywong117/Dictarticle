<template>
  <div v-if="articleAnswer" class="px-4 md:px-40 m-2 pt-8 font-serif">
    <div class="text-xl font-poppins text-zinc-900 leading-loose">
      <span v-for="(part, index) in parsedArticleAnswer" :key="index">
        <span v-if="part.type === 'text'">{{ part.content }}</span>
        <!-- <my-tooltip v-else :vocab="part.title"> -->
        <my-tooltip v-else :vocab="part.title">
          <template #reference>
            <!-- <span class=" border-b border-dashed border-violet-600 "style="cursor: help;">
              {{ part.title }}
            </span> -->
            <a class="underline decoration-pink-500/50 hover:decoration-pink-500">
              {{ part.title }}
            </a>
          </template>
          {{ part.title }}: {{ part.content }}
        </my-tooltip>
      </span>
    </div>
  </div>
</template>

<script>
import { useArticleStore } from '../stores/article.js';
import { ElPopover } from 'element-plus';
import MyTooltip from './MyTooltip.vue';
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
  components: {
    ElPopover,
    MyTooltip,
  },
  computed: {
    parsedArticleAnswer() {
      return this.parseArticleAnswer(this.articleAnswer);
    },
  },
  methods: {
    parseArticleAnswer(text) {
      const parts = [];
      const regex = /\[(.+?)\]\((.+?)\)/g;
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          parts.push({
            type: 'text',
            content: text.slice(lastIndex, match.index),
          });
        }
        parts.push({
          type: 'popover',
          title: match[1],
          content: match[2],
        });
        lastIndex = regex.lastIndex;
      }

      if (lastIndex < text.length) {
        parts.push({
          type: 'text',
          content: text.slice(lastIndex),
        });
      }

      return parts;
    },
  },
};
</script>
