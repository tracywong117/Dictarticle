<template>
  <div class="flex justify-center">
    <div class="">
      <Container @drop="onDrop($event)" non-drag-area-selector=".field" drag-class="form-ghost"
        drop-class="form-ghost-drop" :class="{ isActive: true }">
        <Draggable v-for="field in form" :key="field.type">
          <div class="border">
            <div class="hover:bg-slate-100">
              <span>{{ field.label }}</span>
            </div>
            
            <div class="field">
              <h2 v-if="field.type === 'header'" class="field">
                Form Header
              </h2>
              <div v-if="field.type === 'fullname'" class="field-group">
                <input type="text" /><input type="text" />
              </div>
              <div v-if="field.type === 'email'" class="field">
                <input type="email" />
              </div>
              <div v-if="field.type === 'address'" class="field">
                <textarea></textarea>
              </div>
              <div v-if="field.type === 'dropdown'" class="field">
                <select>
                  <option value="1">Option 1</option>
                  <option value="2" selected>Option 2</option>
                  <option value="3">Option 3</option>
                  <option value="4">Option 4</option>
                </select>
              </div>
              <div v-if="field.type === 'checkbox'" class="field">
                <div><label><input type="checkbox" name="r" /> option 1</label></div>
                <div><label><input type="checkbox" name="r" /> option 2</label></div>
                <div><label><input type="checkbox" name="r" /> option 3</label></div>
                <div><label><input type="checkbox" name="r" /> option 4</label></div>
                <div><label><input type="checkbox" name="r" /> option 5</label></div>
              </div>
              <div v-if="field.type === 'radio'" class="field">
                <div><label><input type="radio" name="r" /> option 1</label></div>
                <div><label><input type="radio" name="r" /> option 2</label></div>
                <div><label><input type="radio" name="r" /> option 3</label></div>
                <div><label><input type="radio" name="r" /> option 4</label></div>
                <div><label><input type="radio" name="r" /> option 5</label></div>
              </div>
            </div>
          </div>
        </Draggable>
      </Container>
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue3-smooth-dnd'

const formInitial = [
  { type: 'header' },
  { type: 'fullname', label: 'Full Name' },
  { type: 'email', label: 'E Mail' },
  { type: 'address', label: 'Address' },
  { type: 'dropdown', label: 'Options' },
  { type: 'checkbox', label: 'Checkbox Options' },
  { type: 'radio', label: 'Radio Options' },
  { type: 'submit' }
]

export default {
  name: 'Form',

  components: { Container, Draggable },

  data() {
    return {
      form: [...formInitial]
    }
  },

  methods: {
    onDrop(dropResult) {
      this.form = applyDrag(this.form, dropResult)
    },
    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;

      if (removedIndex === null && addedIndex === null) return arr;
      const result = [...arr];
      let itemToAdd = payload;

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }
      return result;
    }
  }
}
</script>