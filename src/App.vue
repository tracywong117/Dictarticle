<template>
  <div class="flex flex-col min-h-screen overflow-y-auto">
    <div class="flex-1 my-5">
      <div class="flex justify-between font-poppins items-center w-full pb-2 border-b">
        <div>
          <!-- Empty  -->
        </div>
        <div class="font-bold text-4xl">
          DictArticle
          <div class="flex justify-center ml-[4.2rem] mt-[-10px]" style="height: 20px;">
            <svg viewBox="0 0 200 20" preserveAspectRatio="none" width="120" height="20">
              <!-- Define the gradient -->
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#ff007f;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
                </linearGradient>
              </defs>
              <!-- Wavy path -->
              <path
                d="M0 10 Q 10 0, 20 10 Q 30 20, 40 10 Q 50 0, 60 10 Q 70 20, 80 10 Q 90 0, 100 10 Q 110 20, 120 10 Q 130 0, 140 10 Q 150 20, 160 10 Q 170 0, 180 10 Q 190 20, 200 10"
                style="fill: none; stroke: url(#gradient); stroke-width: 2;" />
            </svg>
          </div>
        </div>
        <div class="flex flex-row space-x-3 mx-3">
          <setting-button @click="handleClick"></setting-button>
          <menu-button class="mr-4" @click="handleClick"></menu-button>
        </div>
      </div>
      <Home></Home>
    </div>

    <div class="mt-12 p-5 relative  text-center">
      <div class="dashed-line"></div>
      <div>
        <p class="mt-4">Built with GroqCloud, Vercel</p>
        <p>
          <a href="https://github.com/Tracy" target="_blank" class="text-blue-500 hover:underline">Tracy</a> |
          <a href="https://github.com/project-repo" target="_blank" class="text-blue-500 hover:underline">GitHub</a>
        </p>
      </div>
    </div>
    
  </div>
</template>

<script>
import Home from './views/Home.vue';
import { useArticleStore } from './stores/article.js';
import MenuButton from './components/MenuButton.vue';
import SettingButton from './components/SettingButton.vue';
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
    Home,
    MenuButton,
    SettingButton,
  },
  data() {
    return {
    }
  },
  methods: {
    handleClick() {
      console.log('Button clicked!');
    }
  }
}
</script>

<style>
body::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle,
      rgba(255, 255, 224, 0.2) 10%, rgba(255, 255, 224, 0) 30%,
      rgba(173, 216, 230, 0.2) 40%, rgba(173, 216, 230, 0) 60%,
      rgba(255, 182, 193, 0.2) 70%, rgba(255, 182, 193, 0) 90%,
      rgba(221, 160, 221, 0.2) 100%);
  background-size: 200% 200%;
  animation: inkMove 20s ease infinite;
  filter: blur(15px);
  opacity: 0.6;
  z-index: -1;
}

@keyframes inkMove {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.dashed-line {
  width: 100%;
  height: 1px;
  border: none;
  background: repeating-linear-gradient(to right,
      #e1bee7,
      /* light purple */
      #e1bee7 5px,
      transparent 5px,
      transparent 10px,
      #bbdefb 10px,
      /* light blue */
      #bbdefb 15px,
      transparent 15px,
      transparent 20px,
      #f8bbd0 20px,
      /* light pink */
      #f8bbd0 25px,
      transparent 25px,
      transparent 30px,
      #fff9c4 30px,
      /* light yellow */
      #fff9c4 35px,
      transparent 35px,
      transparent 40px,
      #ffccbc 40px,
      /* light red */
      #ffccbc 45px,
      transparent 45px,
      transparent 50px);
}
</style>
