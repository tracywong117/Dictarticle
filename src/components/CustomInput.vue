<template>
  <input type="text" placeholder="Title for this article"
                class="custom-input h-6 w-full border-none rounded-sm outline-none resize-none px-2 py-6 m-0 
                hover:bg-gray-100 focus:bg-slate-100
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