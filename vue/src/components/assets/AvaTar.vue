<template>
  <div class="avatar" :class="{
    small: size === 'small',
    noimage: !src.length,
    selected: selected
  }">
    <img v-if="src" :src="src" draggable="false" alt="User avatar" />
    <div v-else class="initials">
      {{ initials }}
    </div>
  </div>

</template>

<script>
export default {
  props: {
    name: String,
    src: String,
    type: String,
    size: String,
    selected: Boolean
  },
  data() {
    return {
      initials: "  ",
    };
  },
  methods: {
    getInitials(name) {
      const words = name.split(" ");
      const initials = words.map((word) => word[0]);
      return initials.join("");
    },
  },
  mounted() {
    this.initials = this.getInitials(this.name);
  },
};
</script>
<style lang="sass" scoped>
@import "/src/styles/mixins.sass"
.avatar
  // background-color: #666
  display: flex
  align-items: center
  justify-content: center
  width: 40px
  height: 40px
  border-radius: 50%
  position: relative
  overflow: hidden
  color: white
  cursor: pointer
  border: 2px solid transparent
  &.small
    width: 36px
    height: 36px
  img
    width: 100%
    height: auto
  &.noimage
    background-color: #666

.selected
  border: 2px solid cyan
  transition: all 0.25s ease
</style>

