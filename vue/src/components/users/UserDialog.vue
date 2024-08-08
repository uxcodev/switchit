<template>
  <Vue3TailwindModal
    :showModal="open"
    @close="handleClose"
    modalClasses="w-145 !py-10 !pl-10 !pr-5 custom-dialog relative bg-white max-h-[85vh]"
  >
    <template #header>
      <div class="mb-12.5 w-full">
        <h1 class="text-center text-2xl text-shade-33">Invite user to Lead Manager</h1>

        <p v-if="user" class="mt-12.5 text-center text-2xl text-shade-33">Edit user</p>

        <CloseIcon
          class="absolute right-5 top-5 cursor-pointer text-shade-55"
          @click="handleClose"
        />
      </div>
    </template>

    <div class="pr-5">
      <form @submit="onSubmit" class="flex flex-col gap-5">
        <div v-if="user">
          <p class="mb-1.5">Status</p>
          <div class="flex items-center gap-4">
            <BasicBadge
              :text="user.status?.name"
              :status="user?.status?.name === 'Active' ? 'success' : 'pending'"
            />
            <span
              v-if="user?.status?.name === 'Active'"
              class="cursor-pointer text-xsm text-blue-light"
              >Deactivate user</span
            >
            <span v-else class="cursor-pointer text-xsm text-blue-light">Activate user</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <FormInput name="firstName" label="Name" />
          <FormInput name="lastName" class="mt-6" />
        </div>

        <FormInput name="email" label="Email" />

        <FormMultiSelect name="roles" label="Roles" :options="roleOptions" />

        <FormMultiSelect
          name="access"
          label="Countries you are active in"
          :options="countryOptions"
        />

        <div class="flex flex-col gap-5">
          <p>Service access per country</p>
          <FormSelect name="country" :options="countryOptions" size="sm" class="max-w-37.5" />

          <div class="grid grid-cols-2 gap-x-4 gap-y-3">
            <FormCheckbox name="isMobile" label="Mobile" />
            <FormCheckbox name="isBroadband" label="Broadband" />
            <FormCheckbox name="isHome" label="Home Insurance" />
          </div>
        </div>

        <div class="mt-7.5 flex flex-col gap-5">
          <BasicButton color="secondary" type="submit">
            {{ user ? 'Save' : 'Invite User' }}
          </BasicButton>

          <BasicButton variant="text" @click="handleClose"> Cancel </BasicButton>
        </div>
      </form>
    </div>

    <template #footer>
      <div></div>
    </template>
  </Vue3TailwindModal>
</template>

<script setup>
import { watch } from 'vue';
import * as Yup from 'yup';
import { useForm } from 'vee-validate';
import { Vue3TailwindModal } from 'vue3-tailwind-modal';
import CloseIcon from '@/components/basic/icons/CloseIcon.vue';
import FormInput from '@/components/basic/form/FormInput.vue';
import BasicButton from '@/components/basic/button/BasicButton.vue';
import FormSelect from '@/components/basic/form/FormSelect.vue';
import FormMultiSelect from '@/components/basic/form/FormMultiSelect.vue';
import FormCheckbox from '@/components/basic/form/FormCheckbox.vue';
import BasicBadge from '@/components/basic/badge/BasicBadge.vue';

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  user: {
    type: Object,
    required: false,
  },
});

const emit = defineEmits(['close']);

const schema = Yup.object({
  firstName: Yup.string().label('First Name').trim().required(),
  lastName: Yup.string().label('Last Name').trim().required(),
  email: Yup.string().email().label('Email').trim().required(),
});

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});

const handleClose = () => {
  emit('close');
};

const countryOptions = [
  { label: 'Denmark', value: 'DA' },
  { label: 'Sweden', value: 'SE' },
];

const roleOptions = [
  { label: 'Admin', value: 1 },
  { label: 'User', value: 2 },
  { label: 'Manager', value: 3 },
  { label: 'Sales', value: 4 },
];

const onSubmit = handleSubmit((values) => {
  console.log(values);
});

watch(
  () => props.user,
  (user) => {
    if (user) {
      resetForm({
        values: {
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          roles: (user.roles ?? []).map((item) => item.id),
          access: (user.access ?? []).map((item) => item.country),
        },
      });
    } else {
      resetForm();
    }
  },
);
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
