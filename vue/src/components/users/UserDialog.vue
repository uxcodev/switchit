<template>
  <Vue3TailwindModal
    :showModal="open"
    @close="handleClose"
    modalClasses="w-145 !p-10 custom-dialog relative bg-white"
  >
    <template #header>
      <div class="w-full mb-12.5">
        <h1 class="text-2xl text-center text-shade-33">Invite user to Lead Manager</h1>

        <CloseIcon class="absolute top-5 right-5 cursor-pointer text-shade-55" @click="handleClose" />
      </div>
    </template>

    <div>
      <form @submit="onSubmit" class="flex flex-col gap-5">
        <div class="grid grid-cols-2 gap-4">
          <FormInput name="firstName" label="Name" />
          <FormInput name="lastName" class="mt-6" />
        </div>

        <FormInput name="email" label="Email" />

        <BasicButton color="secondary" class="mt-7.5" type="submit">
          Invite User
        </BasicButton>

        <BasicButton variant="text">
          Cancel
        </BasicButton>
      </form>

    </div>

    <template #footer>
      <div></div>
    </template>

  </Vue3TailwindModal>
</template>

<script setup>
import * as Yup from 'yup';
import { useForm } from 'vee-validate';
import { Vue3TailwindModal } from "vue3-tailwind-modal";
import CloseIcon from '@/components/basic/icons/CloseIcon.vue';
import FormInput from '@/components/basic/form/FormInput.vue';
import BasicButton from '@/components/basic/button/BasicButton.vue';

defineProps({
  open: {
    type: Boolean,
    required: true,
  }
});

const emit = defineEmits(['close']);

const schema = Yup.object({
  firstName: Yup.string().label('First Name').trim().required(),
  lastName: Yup.string().label('Last Name').trim().required(),
  email: Yup.string().email().label('Email').trim().required(),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
});

const handleClose = () => {
  emit('close');
}

const onSubmit = handleSubmit((values) => {
  console.log(values);
});
</script>

<style lang="scss">
.custom-dialog {
  header {
    button {
      display: none;
    }
  }
}
</style>
