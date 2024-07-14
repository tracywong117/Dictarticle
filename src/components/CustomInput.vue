<template>
  <!-- <div class="custom-input-wrapper flex items-center p-[8px] rounded-[4px] bg-white border border-[#e1e1e1]">
    <textarea v-model="content" placeholder="Title for this article"
      class="custom-input h-6 w-full border-none outline-none resize-none p-0 m-0 bg-transparent leading-normal text-[16px] placeholder-[#b1b1b1]"></textarea>
  </div> -->
  <input type="text" placeholder="Title for this article"
                class="custom-input h-6 w-full border-none rounded-sm outline-none resize-none px-2 py-6 m-0 
                hover:bg-gray-100 focus:bg-transparent 
                leading-normal text-[32px] 
                placeholder-[#b1b1b1] bg-transparent" />

</template>

<script>
export default {
  name: 'CustomInput',
  data() {
    return {
      content: '',
    };
  },
};
</script>

<style scoped>
.custom-input-wrapper {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;
}

.custom-input-wrapper:focus-within {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
</style>