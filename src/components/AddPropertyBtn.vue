<template>
    <div class="hover:bg-gray-100 text-[#b1b1b1] text-[16px] px-2 my-1 flex items-center rounded-sm w-fit" @click="handleClick">
        <img src="/icons/plus.svg" class="w-4 h-4 mr-2" alt="Add property" />
        <span class="pr-1">
            Add a property
        </span>
    </div>
</template>

<script>
export default {
    name: 'AddPropertyBtn',
    methods: {
        handleClick() {
            this.$emit('click');
        }
    }
}
</script>
