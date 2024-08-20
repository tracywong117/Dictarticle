<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Todo List</h1>
  
      <!-- Add new task input -->
      <div class="mb-4">
        <input 
          v-model="newTask" 
          @keyup.enter="addTask"
          class="border p-2 mr-2" 
          placeholder="Enter a new task"
        >
        <button 
          @click="addTask" 
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>
  
      <!-- List of tasks -->
      <ul class="space-y-2">
        <li v-for="(task, index) in tasks" :key="index" class="flex items-center justify-between bg-gray-100 p-2 rounded">
          <span>{{ task }}</span>
          <button 
            @click="confirmDelete(index)" 
            class="bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </li>
      </ul>
  
      <!-- Delete Dialog component -->
      <DeleteDialog 
        :show="showDeleteDialog"
        :message="deleteMessage"
        @cancel="cancelDelete"
        @confirm="confirmDeleteTask"
      />
    </div>
  </template>
  
  <script>
    import DeleteDialog from '@/components/DeleteDialog.vue';
  
  export default {
    name: 'TodoList',
    components: {
      DeleteDialog
    },
    data() {
      return {
        tasks: ['Buy groceries', 'Walk the dog', 'Pay bills'],
        newTask: '',
        showDeleteDialog: false,
        deleteMessage: '',
        taskIndexToDelete: null
      }
    },
    methods: {
      addTask() {
        if (this.newTask.trim()) {
          this.tasks.push(this.newTask.trim());
          this.newTask = '';
        }
      },
      confirmDelete(index) {
        this.taskIndexToDelete = index;
        this.deleteMessage = `Are you sure you want to delete the task "${this.tasks[index]}"?`;
        this.showDeleteDialog = true;
      },
      cancelDelete() {
        this.showDeleteDialog = false;
        this.taskIndexToDelete = null;
      },
      confirmDeleteTask() {
        if (this.taskIndexToDelete !== null) {
          this.tasks.splice(this.taskIndexToDelete, 1);
          this.showDeleteDialog = false;
          this.taskIndexToDelete = null;
        }
      }
    }
  }
  </script>