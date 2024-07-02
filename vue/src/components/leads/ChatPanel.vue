<template>
  <div class="chat-panel">
    <div class="chat-panel-content">
      <div class="chat-box-content-history" ref="chatContainer">
        <div class="chat-message assistant">
          <div v-if="type === 'dashboard-insight'">
            <h3>Insights About Current Household Services:</h3>
            <ul>
              <li>"Average monthly spending on broadband services across all users is DKK 350, with the highest
                expenditure observed in urban areas of Denmark."
              </li>
              <li>"The most common contract duration for mobile services among households is 24 months, indicating a
                stable customer base for long-term offers."
              </li>
              <li>"Energy consumption peaks during winter months, suggesting an opportunity for promoting energy-efficient
                solutions starting October."
              </li>
            </ul>
            <h3>Insights About Household Preferences:</h3>
            <ul>
              <li>"Over 65% of households prefer eco-friendly energy solutions, with a notable interest in solar and wind
                energy products."
              </li>
              <li>"There is a 40% higher preference for high-speed internet among households with teenagers, indicating a
                targeted opportunity for broadband upgrades."
              </li>
              <li>"Customer feedback indicates a strong preference for bundled services, with a 30% increase in
                satisfaction when offered combined utility packages."
              </li>
            </ul>
            <h3>Insights About Household Trends:</h3>
            <ul>
              <li>"There has been a 25% increase in the adoption of smart home devices within the last year, signaling a
                growing market for integrated home solutions."
              </li>
              <li>"Households in coastal regions show a 50% greater interest in weather-related insurance services,
                highlighting regional service opportunities."
              </li>
              <li>"Recent data shows a trend towards remote work setups, with a 20% uptick in households upgrading to
                higher internet bandwidth plans."
              </li>
            </ul>
          </div>
          <div v-if="type === 'offer-insight'">
            <h3>Insights About Current Household Services:</h3>
            <ul>
              <li>"For households in [specified city/country], the average annual expenditure on car insurance is 10%
                below the national average, suggesting price sensitivity in this region."
              </li>
              <li>"In [specified sector], households have shown a 15% faster adoption rate for new mobile service plans
                compared to last year, with the majority opting for unlimited data plans."
              </li>
            </ul>
            <h3>Insights About Household Preferences:</h3>
            <ul>
              <li>"Households filtered by eco-friendly preferences show a 75% likelihood to switch providers if offered
                sustainable energy alternatives at a competitive price."
              </li>
              <li>"User interactions reveal that households prioritizing customer support are 30% more loyal and provide
                higher NPS scores to their service providers."
              </li>
            </ul>
            <h3>Insights About Household Trends:</h3>
            <ul>
              <li>"Analysis of transactional data from emails and banking reveals that households in [specified area] have
                increased their spending on home security systems by 20% over the past six months."
              </li>
              <li>"There is a rising trend among selected households for seeking bundled home services, particularly in
                telecommunications, with a 35% increase noted in bundle purchases."
              </li>
            </ul>
          </div>
        </div>
        <div v-for="(item, index) in messageHistory" class="chat-message" :class="item.role" v-bind:key="index">
          {{ item.content }}
        </div>
        <div v-if="isResponding" class="chat-message assistant">
          <div class="typing typing-1" />
          <div class="typing typing-2" />
          <div class="typing typing-3" />
        </div>
      </div>

<!--      <div v-else class="empty">-->
<!--        <div class="logo-wrapper">-->
<!--          <SwitchitIcon class="logo" :width="40" :height="40" color="#03D0BF" />-->
<!--          <span class="title">SwitchIt LeadManager AI</span>-->
<!--        </div>-->
<!--        <span class="copilot-description">Your Copilot for managing leads</span>-->
<!--      </div>-->
    </div>

    <div class="chat-input-container">
      <textarea
        v-model.trim="message"
        class="chat-input"
        rows="3"
        @keydown.enter="handleKeyDown"
        placeholder="Ask me anything related to SwitchIt leads"
      />
      <span class="material-symbols-outlined" @click="sendMessage">send</span>
    </div>
  </div>
</template>

<script setup>
import {getCurrentInstance, nextTick, onMounted, ref, watch, defineProps, computed} from "vue";
// import SwitchitIcon from "@/components/assets/SwitchitIcon.vue";

const props = defineProps({
  type: {
    type: String,
    default: 'filter'
  }
});

const isResponding = ref(false);
const message = ref('');
const messageHistory = ref(JSON.parse(localStorage.getItem('chat_messages') || '[]'));
const chatContainer = ref(null);

const storageKey = computed(() => {
  if (props.type === 'dashboard-insight') return 'dashboard-insight-messages';

  if (props.type === 'offer-insight') return 'offer-insight-messages';

  return 'filter-chat-messages';
})

const instance = getCurrentInstance();
const api = instance.appContext.config.globalProperties.$api_node

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight - chatContainer.value.clientHeight;
  }
};


const handleKeyDown = (event) => {
  if (event.key === 'Enter' && event.ctrlKey) {
    sendMessage();
  }
}

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
      localStorage.setItem(storageKey.value, JSON.stringify(messageHistory.value));

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
  messageHistory.value = JSON.parse(localStorage.getItem(storageKey.value) || '[]');
  nextTick(scrollToBottom);
})
</script>

<style lang="sass" scoped>
@import "/src/styles/_variables.sass"

ul
  li
    list-style: disc !important
    &::marker
      color: #000

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
        max-width: 85%

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

        &.assistant
          color: $darker

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
    padding: 8px 0

    .chat-input
      height: 100%
      border-top-left-radius: 8px
      border-bottom-left-radius: 8px
      padding: 4px 8px
      border: none
      outline: none
      flex-grow: 1
      resize: none

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
