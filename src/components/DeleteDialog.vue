<template>
    <div v-if="show" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div class="bg-white p-5 rounded-lg shadow-xl max-w-sm w-full">
        <h2 class="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p class="mb-6">{{ message }}</p>
        <div class="flex justify-end space-x-4">
          <button @click="cancel" class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
            Cancel
          </button>
          <button @click="confirm" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DeleteDialog',
    props: {
      show: {
        type: Boolean,
        required: true
      },
      message: {
        type: String,
        required: true
      }
    },
    methods: {
      cancel() {
        this.$emit('cancel');
      },
      confirm() {
        this.$emit('confirm');
      }
    }
  }
  </script>
  
  <style scoped>
  /* You can add any additional styles here if needed */
  </style>