<!-- <template>
    <button class="rounded-full w-12 h-12 flex items-center justify-center overflow-hidden border hover:border-purple-300">
        <img class="w-6 h-6" src="../assets/icons/magic-star-icon.png" alt="Star Icon">
    </button>
</template> -->
<template>
    <button
      class="rounded-full w-12 h-12 flex items-center justify-center overflow-hidden border hover:border-purple-300"
      @click="$emit('click')"
    >
      <img class="w-6 h-6" src="../assets/icons/menu-star.svg" alt="Star Icon">
    </button>
  </template>
  