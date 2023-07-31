<template> 
    <div class="tags-input">
        <div class="tag" v-for="(tag, index) in tags" :key="index">
          {{ tag }}
          <span class="remove-btn material-symbols-outlined" @click="removeTag(index)">close</span>
          <!-- <button class="remove-btn" @click="removeTag(index)">x</button> -->
        </div>
        <input
          v-model="input"
          @keyup.enter="addTag"
          @keyup="handleKeyup"
          @blur="addTag"
          placeholder=""
        />
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
    modelValue: {
      type: Array,
      required: false
    }
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const input = ref('');
    const tags = ref(props.modelValue);

    watch(tags, (newTags) => {
      emit('update:modelValue', newTags);
    });

    const addTag = () => {
      let tag = input.value.trim();
      tag = tag.replace(/,/g, '');
      if (tag !== '') {
        tags.value.push(tag);
        input.value = '';
      }
    };

    const handleKeyup = (event) => {
      if (event.key === ',') {
        addTag();
      }
    };

    const removeTag = (index) => {
      tags.value.splice(index, 1);
    };

    return { input, tags, addTag, handleKeyup, removeTag };
  }
};
</script>

<style scoped lang="sass">

@import "/src/styles/variables.sass"

.tags-input
  width: 100%
  display: flex
  flex-direction: row
  border: 1px solid #ccc
  align-items: center
  padding: 0px 5px
  border-radius: $input-border-radius
  gap: 4px

.tag
  white-space: nowrap
  display: flex
  flex-wrap: wrap
  align-items: center
  background-color: #e9e9e9
  color: #333
  border-radius: 20px
  padding: 2px 5px 2px 8px
  font-size: 0.8rem
  gap: 2px

.remove-btn
  font-size: 12px
  background: transparent
  border: none
  cursor: pointer

input
  flex-grow: 1
  border: none !important
  outline: none
  padding: 5px 5px 5px 2px !important

</style>
