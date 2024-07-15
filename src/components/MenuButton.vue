<template>
  <!-- Overlay -->
  <!-- <div v-if="isMenuOpen" class="fixed inset-0 bg-slate-800 opacity-20 z-40" @click="toggleMenu"></div> -->

  <button class="rounded-full w-12 h-12 flex items-center justify-center overflow-hidden border hover:border-purple-300"
    @click="toggleMenu">
    <img class="w-6 h-6" src="/icons/menu-star.svg" alt="Star Icon">
  </button>

  <!-- Menu -->
   <!-- Menu -->
   <transition name="slide-fade">
      <div v-if="isMenuOpen" class="fixed inset-y-0 right-0 w-64 bg-white border-l rounded-l-lg shadow-lg z-50 overflow-y-auto">
        <div class="p-4 border-b flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <img src="https://avatars.githubusercontent.com/u/583231?v=4" alt="User Avatar" class="w-10 h-10 rounded-full">
            <div>
              <div class="font-semibold">User ID</div>
              <div class="text-sm text-gray-500">User Name</div>
            </div>
          </div>
          <button @click="toggleMenu" class="text-gray-500 hover:text-gray-800 focus:outline-none hover:bg-slate-100 p-2 rounded">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="p-4 space-y-3">
          <a href="#" class="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-md">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
            <span>View All</span>
          </a>
          <!-- Repeat for other menu items -->
        </div>

        <div class="p-4 border-t">
          <a href="#" class="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-md">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
            <span>Sign out</span>
          </a>
        </div>
      </div>
    </transition>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
};
</script>

<style scoped>
/* .slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-enter {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(100%);
} */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}
.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
  transform: translateX(100%);
  opacity: 0;
}
</style>
