<template>
  <button class="rounded-full w-12 h-12 flex items-center justify-center overflow-hidden bg-transparent"
    @click="$emit('click')">
    <img class="w-6 h-6" src="../assets/icons/settings.svg" alt="Star Icon">
  </button>
</template>