<template>
  <div class="chat-panel">
    <div class="chat-panel-content">
      <div v-if="messageHistory.length > 0" class="chat-box-content-history" ref="chatContainer">
        <div v-for="(item, index) in messageHistory" class="chat-message" :class="item.role" v-bind:key="index">
          {{ item.content }}
        </div>
        <div v-if="isResponding" class="chat-message assistant">
          <div class="typing typing-1" />
          <div class="typing typing-2" />
          <div class="typing typing-3" />
        </div>
      </div>

      <div v-else class="empty">
        <div class="logo-wrapper">
          <SwitchitIcon class="logo" :width="40" :height="40" color="#03D0BF" />
          <span class="title">SwitchIt LeadManager</span>
        </div>
        <span class="copilot-description">Your Copilot for managing leads</span>
      </div>
    </div>

    <div class="chat-input-container">
      <input v-model.trim="message" @keydown.enter="sendMessage" placeholder="Ask me anything"/>
      <span class="material-symbols-outlined" @click="sendMessage">send</span>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, nextTick, onMounted, ref, watch } from "vue";
import SwitchitIcon from "@/components/assets/SwitchitIcon.vue";

const isResponding = ref(false);
const message = ref('');
const messageHistory = ref(JSON.parse(localStorage.getItem('chat_messages') || '[]'));
const chatContainer = ref(null);

const instance = getCurrentInstance();
const api = instance.appContext.config.globalProperties.$api_node

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight - chatContainer.value.clientHeight;
  }
};

const sendMessage = async () => {
  if (message.value) {
    try {
      messageHistory.value.push({role: 'user', content: message.value});
      nextTick(scrollToBottom);
      message.value = '';
      isResponding.value = true;
      const response = await api.chat(messageHistory.value);
      isResponding.value = false;
      messageHistory.value.push(response);
      nextTick(scrollToBottom);
      localStorage.setItem('chat_messages', JSON.stringify(messageHistory.value));

    } catch (e) {
      isResponding.value = false;
      console.log(e)
    }
  }
}

watch(messageHistory, async () => {
  await nextTick();
  scrollToBottom();
})

onMounted(() => {
  messageHistory.value = JSON.parse(localStorage.getItem('chat_messages') || '[]');
  nextTick(scrollToBottom);
})
</script>

<style lang="sass" scoped>
@import "/src/styles/_variables.sass"

.chat-panel
  height: 100%
  display: flex
  flex-direction: column
  background: #f2f2f2
  border-radius: 8px
  padding: 20px
  min-height: 500px

  &-content
    height: 0
    flex-grow: 1

    .chat-box-content-history
      overflow-y: auto
      height: calc(100% - 40px)

      &::-webkit-scrollbar
        width: 8px

      &::-webkit-scrollbar-track
        border-radius: 10px
        background-color: #f1f1f1

      &::-webkit-scrollbar-thumb
        border-radius: 10px
        background-color: #8f8f8f

      .chat-message
        box-shadow: 0 0 2rem rgba(0, 0, 0, 0.075), 0rem 1rem 1rem -1rem rgba(0, 0, 0, 0.1)
        background-color: #ffffff
        box-sizing: border-box
        padding: 0.5rem 1rem
        margin: 1rem
        border-radius: 1.125rem 1.125rem 1.125rem 0
        min-height: 2.25rem
        width: fit-content
        max-width: 66%

        .typing
          display: inline-flex
          width: 10px
          height: 10px
          margin-right: 2px
          box-sizing: border-box
          background: #c3c3c3
          border-radius: 50%
          &.typing-1
            animation: typing 3s infinite
          &.typing-2
            animation: typing 3s 250ms infinite
          &.typing-3
            animation: typing 3s 500ms infinite

        &.user
          margin: 1rem 1rem 1rem auto
          border-radius: 1.125rem 1.125rem 0 1.125rem
          background-color: #2C3E50
          color: #fff

    .empty
      display: flex
      flex-direction: column
      gap: 10px
      align-items: center
      justify-content: center
      height: 100%

      .logo-wrapper
        display: flex
        align-items: center
        column-gap: 16px
        color: $darker

        .title
          font-weight: 600
          font-size: 18px

      .copilot-description
        color: $darker
        font-size: 16px

  .chat-input-container
    background-color: #fff
    display: flex
    align-items: center
    min-height: 40px
    border-radius: 8px
    border: 1px solid #1059a7

    input
      height: 100%
      border-top-left-radius: 8px
      border-bottom-left-radius: 8px
      padding: 4px 4px 4px 8px
      border: none
      outline: none
      flex-grow: 1

    .material-symbols-outlined
      color: #1059a7
      cursor: pointer
      padding: 0 12px
      user-select: none

@keyframes typing
  0%, 75%, 100%
    transform: translate(0, 0.25rem) scale(0.9)
    opacity: 0.5

  25%
    transform: translate(0, -0.25rem) scale(1)
    opacity: 1
</style>
