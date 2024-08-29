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
          <!-- <div v-for="(property, index) in propertiesData" :key="index" class="relative">
            <ArticleProperty v-model:textValue="property.textValue" v-model:currentTagIds="property.currentTagIds"
              v-model:allTags="property.allTags" v-model:property="property.property"
              @delete-property="handleDeleteProperty(index)" />
          </div> -->

          <!-- <div v-for="(property, index) in allProperty" :key="index" draggable="true"
            @dragstart="onDragStart(index, $event)" @dragend="onDragEnd" @dragover.prevent="onDragOver(index)"
            @mouseover="onMouseOver(index)" @mouseleave="onMouseLeave(index)">
            <ArticleProperty v-model:textValue="property.textValue" v-model:currentTagIds="property.currentTagIds"
              v-model:allTags="property.allTags" v-model:property="property.property"
              @delete-property="handleDeleteProperty(index)" />
          </div> -->
          <!-- <div v-for="(propertyId, index) in allPropertyIds" :key="propertyId">
            <ArticleProperty :property="propertiesData[index].property"
              v-model:textValue="propertiesData[index].textValue"
              v-model:currentTagIds="propertiesData[index].currentTagIds"
              v-model:allTags="propertiesData[index].allTags" @deleteProperty="handleDeleteProperty(index)"
              @dragstart="onDragStart(index, $event)" @dragover="onDragOver(index)" @dragend="onDragEnd"
              @mouseover="onMouseOver(index)" @mouseleave="onMouseLeave(index)" />
          </div> -->
          <Container orientation="vertical" @drop="onDrop" lock-axis="y" nonDragAreaSelector=".nonDraggable" rag-class="form-ghost"
          drop-class="form-ghost-drop" :class="{ isActive: true }">
            <Draggable v-for="(property, index) in propertiesData" :key="property.property.id">
              <ArticleProperty v-model:textValue="property.textValue" v-model:currentTagIds="property.currentTagIds"
                v-model:allTags="property.allTags" v-model:property="property.property"
                @delete-property="handleDeleteProperty(index)" />
            </Draggable>
          </Container>

          <AddPropertyBtn @add-property="handleAddProperty"></AddPropertyBtn>
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
import { useArticleStore } from '@/stores/article.js';
import { ElPopover } from 'element-plus';
import MyTooltip from '@/components/MyTooltip.vue';
import { toRefs } from 'vue';
import CustomInput from '@/components/CustomInput.vue';
import ArticleProperty from '@/components/ArticleProperty.vue';
import AddPropertyBtn from '@/components/AddPropertyBtn.vue';

import { Container, Draggable } from "vue3-smooth-dnd";

import { v4 as uuidv4 } from 'uuid';

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
      propertiesData: [
        {
          textValue: '',
          currentTagIds: [],
          allTags: [],
          property: {
            type: 'Text',
            name: 'Demo',
            id: '', // uuidv4(),
          },
        },
      ],
      allPropertyIds: [], // Store all property ids 
      draggedIndex: null,
      transparentImage: null,
    }
  },
  components: {
    ElPopover,
    MyTooltip,
    CustomInput,
    ArticleProperty,
    AddPropertyBtn,
    Container,
    Draggable
  },
  mounted() {
    // this.articleAnswer = {}
    // this.articleAnswer.createdAt = new Date();
    // this.articleAnswer.text = `\
    // With blood on his face, he was then escorted from the stage by [Secret Service](秘勤局) agents, pausing to raise his fist in the air to chants of "USA! USA!" from the crowd.

    // It later emerged 20-year-old Pennsylvania man Thomas Matthew Crooks had fired several shots at Trump from a [rooftop](屋頂) outside the rally venue, before being shot dead by [police snipers](警察狙擊手).

    // One [rallygoer](集會參與者) was killed and two others remain in a [critical condition](危險狀態). Trump's campaign says he is doing fine.\
    // `
    const initialPropertyId = uuidv4();
    this.propertiesData[0].property.id = initialPropertyId;
    this.allPropertyIds.push(initialPropertyId);
  },
  created() {
    // Create a transparent image programmatically
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 1, 1);
    this.transparentImage = new Image();
    this.transparentImage.src = canvas.toDataURL();
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
    // handleAddProperty() {
    //   this.propertiesData.push({
    //     textValue: '',
    //     currentTagIds: [],
    //     allTags: [],
    //     property: {
    //       type: 'Text',
    //       name: 'New Property',
    //       id: uuidv4(),
    //     },
    //   });
    // },
    handleAddProperty() {
      const newPropertyId = uuidv4();
      this.propertiesData.push({
        textValue: '',
        currentTagIds: [],
        allTags: [],
        property: {
          type: 'Multi-select',
          name: 'New Property',
          id: newPropertyId,
        },
      });
      this.allPropertyIds.push(newPropertyId);
    },
    // handleDeleteProperty(index) {
    //   console.log('delete property', index);
    //   console.log(this.propertiesData[index]);
    //   this.propertiesData.splice(index, 1);
    //   console.log(this.propertiesData);
    // },
    handleDeleteProperty(index) {
      console.log('delete property', index);
      console.log(this.propertiesData[index]);
      this.propertiesData.splice(index, 1);
      this.allPropertyIds.splice(index, 1);
      console.log(this.propertiesData);
    },
    // onDragStart(index, event) {
    //   // console.log('drag start', index);
    //   this.draggedIndex = index;
    //   event.dataTransfer.effectAllowed = 'move';
    //   if (this.transparentImage) {
    //     event.dataTransfer.setDragImage(this.transparentImage, 0, 0);
    //   }
    // },
    // onDragOver(targetIndex) {
    //   // console.log('drag over', targetIndex);
    //   if (this.draggedIndex !== null && this.draggedIndex !== targetIndex) {
    //     const draggedPropertyId = this.allPropertyIds[this.draggedIndex];
    //     this.allPropertyIds.splice(this.draggedIndex, 1);
    //     this.allPropertyIds.splice(targetIndex, 0, draggedPropertyId);

    //     const draggedItem = this.propertiesData[this.draggedIndex];
    //     this.propertiesData.splice(this.draggedIndex, 1);
    //     this.propertiesData.splice(targetIndex, 0, draggedItem);

    //     // console.log(this.allPropertyIds);
    //     // console.log(this.propertiesData);
    //     this.draggedIndex = targetIndex;
    //   }
    // },
    // onDragEnd() {
    //   // console.log('drag end');
    //   this.draggedIndex = null;
    // },
    // onMouseOver(propertyId) {
    //   // console.log('mouse over', propertyId);
    //   if (this.draggedIndex === null) {
    //     this.hoveredPropertyId = propertyId;
    //   }
    // },
    // onMouseLeave(propertyId) {
    //   // console.log('mouse leave', propertyId);
    //   if (this.hoveredPropertyId === propertyId && this.draggedIndex === null) {
    //     this.hoveredPropertyId = null;
    //   }
    // },
    onDrop(dropResult) {
      this.propertiesData = this.applyDrag(this.propertiesData, dropResult);
    },
    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;

      if (removedIndex === null && addedIndex === null) return arr;
      const result = [...arr];
      let itemToAdd = payload;

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }
      return result;
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