<template>
  <div>
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-blue-gray-600 text-2xl">Users</h1>

      <BasicButton
        @click="openUserDialog"
        class="!rounded-7.5 !h-[35px]"
      >
        Invite user
      </BasicButton>
    </div>

    <BasicTable
      :data="users" :columns="columns"
      row-class="cursor-pointer"
      @rowClick="onClickUser"
    >
      <template #td-info="{ row }">
        <div class="flex items-center gap-4">
          <BasicAvatar
            :name="`${row.first_name} ${row.last_name}`"
          />

          <div>
            <p class="mb-1">
              {{row.first_name}} {{row.last_name}}
            </p>

            <p class="text-xsm">{{ row.email }}</p>
          </div>
        </div>
      </template>

      <template #td-roles="{ row }">
        <div class="flex items-center flex-wrap gap-1.5">
          <span
            v-for="role in row.roles"
            :key="role.id"
            class="inline-flex bg-dark text-white text-xs py-1 px-2 rounded-1"
          >
            {{ role.name }}
          </span>
        </div>
      </template>

      <template #td-status="{ row }">
        <BasicBadge
          :text="row.status?.name"
          :status="row.status?.name === 'Active' ? 'success' : 'pending'"
        />
      </template>
    </BasicTable>

    <UserDialog
      :open="showUserDialog"
      :user="user"
      @close="closeUserDialog"
    />
  </div>
</template>

<script setup>
import BasicButton from '@/components/basic/button/BasicButton.vue';
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import BasicTable from '@/components/basic/table/BasicTable.vue';
import BasicAvatar from '@/components/basic/avatar/BasicAvatar.vue';
import UserDialog from '@/components/users/UserDialog.vue';
import BasicBadge from '@/components/basic/badge/BasicBadge.vue';

const instance = getCurrentInstance();
const switchit = instance.appContext.config.globalProperties.$switchit

const columns = computed(() => [
  { id: 'info', title: 'User' },
  { id: 'roles', title: 'Roles' },
  { id: 'created', title: 'Created', valueGetter: (row) => new Date(row.created).toLocaleDateString() },
  { id: 'last_active', title: 'Last active', valueGetter: (row) => new Date(row.last_active).toLocaleDateString() },
  { id: 'status', title: 'Status', },
]);

const users = ref([]);
const loading = ref(false);
const showUserDialog = ref(false);
const user = ref(undefined);

const openUserDialog = () => {
  showUserDialog.value = true;
}

const closeUserDialog = () => {
  user.value = undefined;
  showUserDialog.value = false;
}

const fetchUsers = () => {
  if (switchit === 123) {
    loading.value = true;
    switchit.getUsers()
      .then((res) => {
        users.value = res.data;
        loading.value = false;
      })
      .catch(() => {
        loading.value = false;
      })
  } else {
    users.value = [
      {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@gmail.com",
        roles: [{ id: 1, name: "Admin" }],
        created: "2024-06-20T21:13:49.005749",
        last_active: "2024-06-20T21:13:49.005749",
        status: {id: 1, name: 'Pending'},
        access: [{country: 'DA', serviceType: 8}, {country: 'SE', serviceType: 4}]
      },
      {
        id: 2,
        first_name: "Jane",
        last_name: "Doe",
        email: "janedoe@gmail.com",
        roles: [{ id: 2, name: "User" }],
        created: "2024-06-20T21:13:49.005749",
        last_active: "2024-06-20T21:13:49.005749",
        status: {id: 2, name: 'Active'},
        access: [{country: 'DA', serviceType: 8}, {country: 'SE', serviceType: 4}]
      }
    ]
  }
}

const onClickUser = (row) => {
  user.value = row;
  openUserDialog();
}

onMounted(() => {
  fetchUsers();
})
</script>
