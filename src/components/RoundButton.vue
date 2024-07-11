<template>
    <button class="flex items-center text-center border px-5 py-1 rounded-lg hover:border-purple-600"
        @click="$emit('click')">
        <img src="../assets/icons/magic-star.svg" alt="Magic Star Icon" class="w-5 h-5 mr-2">
        {{ buttonText }}
    </button>
</template>

<script>
export default {
    name: 'FileUpload',
    props: {
        buttonText: {
            type: String,
            default: 'Get Result!'
        }
    },
}
</script>