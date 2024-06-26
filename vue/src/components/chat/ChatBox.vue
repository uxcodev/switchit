<script>

import {getCurrentInstance, nextTick, ref, watch} from "vue";

export default {

  setup() {
    const instance = getCurrentInstance();
    const api = instance.appContext.config.globalProperties.$api_node
    const openChatModal = ref(false);
    const isResponding = ref(false);
    const message = ref('');
    const messageHistory = ref(JSON.parse(localStorage.getItem('chat_messages') || '[]'));
    const chatContainer = ref(null);

    const scrollToBottom = () => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight - chatContainer.value.clientHeight;
      }
    };

    function toggleChatModal() {
      openChatModal.value = !openChatModal.value;
    }

    async function sendMessage() {

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
          console.log(e)
        }
      }
    }

    watch(openChatModal, () => {
      if (openChatModal.value) {
        messageHistory.value = JSON.parse(localStorage.getItem('chat_messages') || '[]');
        nextTick(scrollToBottom);
      }
    });

    watch(messageHistory, async () => {
      await nextTick();
      scrollToBottom();
    });

    return {
      openChatModal,
      isResponding,
      chatContainer,
      message,
      messageHistory,
      sendMessage,
      toggleChatModal
    }
  }
}
</script>

<template>
  <div>
    <div class="chat-button" v-if="!openChatModal" @click="toggleChatModal">
      <span class="material-symbols-outlined">message</span>
    </div>
    <div class="chat-box" v-if="openChatModal">
      <div class="chat-box-header">
        <span class="material-symbols-outlined" @click="toggleChatModal">close</span>
      </div>
      <div class="chat-box-content">
        <div class="chat-box-content-history" ref="chatContainer">
          <div v-for="(item, index) in messageHistory" class="chat-message" :class="item.role" v-bind:key="index">
            {{ item.content }}
          </div>
          <div v-if="isResponding" class="chat-message assistant">
            <div class="typing typing-1" />
            <div class="typing typing-2" />
            <div class="typing typing-3" />
          </div>
        </div>
        <div class="chat-box-input-wrapper">
          <input v-model.trim="message" @keydown.enter="sendMessage"/>
          <span class="material-symbols-outlined" @click="sendMessage">send</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.chat-button
  position: fixed
  bottom: 20px
  right: 30px
  width: 60px
  height: 60px
  border-radius: 100%
  display: flex
  justify-content: center
  align-items: center
  box-shadow: 0 1px 2px 0 #7a869a
  z-index: 100
  background-color: #2C3E50
  cursor: pointer

  .material-symbols-outlined
    color: #fff

.chat-box
  position: fixed
  bottom: 20px
  right: 30px
  width: 320px
  height: 500px
  display: flex
  flex-direction: column
  border-radius: 8px
  box-shadow: 0 1px 2px 0 #7a869a
  background-color: #f2f2f2
  z-index: 100

  .chat-box-header
    border-top-left-radius: 8px
    border-top-right-radius: 8px
    display: flex
    justify-content: flex-end
    align-items: center
    background-color: #2C3E50
    color: #fff
    height: 50px
    padding: 8px 12px

    .material-symbols-outlined
      cursor: pointer

  .chat-box-content
    flex-grow: 1
    display: flex
    flex-direction: column
    padding: 20px 12px
    height: calc(100% - 40px)

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

    .chat-box-input-wrapper
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