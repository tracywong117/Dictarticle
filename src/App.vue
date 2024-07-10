<template>
  <div id="app">
    <div class="m-7">
      <div class="flex justify-center font-poppins flex-col items-center">
        <div class="text-2xl">
            Your reading companion
        </div>
        <br>
        <div class="text-violet-800 font-bold text-4xl">
            DictArticle
        </div>
    </div>
    <div class="flex justify-center ml-14" style="height: 20px;">
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
      <Home></Home>
    </div>
  </div>
</template>

<script>
import Home from './views/Home.vue';
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
    Home
  },
  data() {
    return {
    }
  },
}
</script>

<style>
     body, html {
      height: 100%;
      margin: 0;
      font-family: Arial, sans-serif;
      position: relative;
      overflow: hidden;
    }

    body::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, 
        rgba(255,255,224,0.2) 10%, rgba(255,255,224,0) 30%,
        rgba(173,216,230,0.2) 40%, rgba(173,216,230,0) 60%,
        rgba(255,182,193,0.2) 70%, rgba(255,182,193,0) 90%,
        rgba(221,160,221,0.2) 100%);
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
</style>
