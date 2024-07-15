<template>
  <div v-if="articleAnswer && articleAnswer.text != 'No result found'" class="px-4 md:px-40 m-2 pt-8 font-serif">
    <div class="text-xl font-poppins text-zinc-900 leading-loose">
      <custom-input />
      <div>
        <div class="text-[14px] text-slate-700 px-2">
          <div class="flex items-center">
            <img src="/icons/calendar.svg" class="w-4 h-4 mr-2" alt="Calendar" />
            <!-- Created at:  -->
            {{ formatCreatedAt }}
          </div>
        </div>
        <div>
          <ArticleProperty></ArticleProperty>
        </div>
      </div>
      <span v-for="(part, index) in parsedArticleAnswer" :key="index">
        <span v-if="part.type === 'text'">{{ part.content }}</span>
        <el-popover v-else placement="top" width="300">
          <template #reference>
            <span class=" border-b border-dashed border-violet-600 bg-amber-100" style="cursor: help;">
              {{ part.title }}
            </span>
          </template>
          <div class="p-3">
            {{ part.title }}: {{ part.content }}
            <div class="container-search-button">
              <button v-for="site in searchSites" :key="site.name" class="search-button"
                @click="openSearchTab(site.name, part.title)">
                <img :src="site.icon" :alt="`${site.name} icon`" />
              </button>
            </div>
          </div>
        </el-popover>
      </span>
    </div>
  </div>
</template>

<script>
import { useArticleStore } from '../stores/article.js';
import { ElPopover } from 'element-plus';
import MyTooltip from '../components/MyTooltip.vue';
import { toRefs } from 'vue';
import CustomInput from '../components/CustomInput.vue';
import ArticleProperty from '../components/ArticleProperty.vue';

export default {
  name: 'Article',
  setup() {
    const articleStore = useArticleStore();
    const articleState = toRefs(articleStore);

    return {
      ...articleState,

    };
  },
  data() {
    return {
      searchSites: [
        { name: 'Google', icon: '/icons/google-icon.webp' },
        { name: 'Wikipedia', icon: '/icons/wikipedia-icon.png' },
        { name: 'Cambridge', icon: '/icons/cambridge-icon.png' },
      ],
    }
  },
  components: {
    ElPopover,
    MyTooltip,
    CustomInput,
    ArticleProperty,
  },
  computed: {
    parsedArticleAnswer() {
      return this.parseArticleAnswer(this.articleAnswer.text);
    },
    formatCreatedAt() {
      const dateOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      };

      const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true, // Use 24-hour time format
      };

      const dateFormatter = new Intl.DateTimeFormat('en-GB', dateOptions); // en-GB for DD/MM/YYYY
      const timeFormatter = new Intl.DateTimeFormat('en-US', timeOptions);

      const date = new Date(this.articleAnswer.createdAt);

      const formattedDate = dateFormatter.format(date);
      const formattedTime = timeFormatter.format(date);

      return `${formattedDate} ${formattedTime}`;
    }
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
    openSearchTab(siteName, searchText) {
      let url = '';
      switch (siteName) {
        case 'Google':
          url = `https://www.google.com/search?q=${encodeURIComponent(searchText)}`;
          break;
        case 'Wikipedia':
          url = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(searchText)}`;
          break;
        case 'Cambridge':
          url = `https://dictionary.cambridge.org/dictionary/english-chinese-traditional/${encodeURIComponent(searchText)}`;
          break;
      }
      window.open(url, '_blank');
    },
  },
};
</script>

<style>
.container-search-button {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.search-button:hover {
  background: #e0e0e0;
}

.search-button {
  all: initial;
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: transparent;
  color: inherit;
  font-size: 16px;
  margin-right: 5px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 5px;
}

.search-button img {
  display: block;
  width: 20px;
  height: 20px;
}
</style>