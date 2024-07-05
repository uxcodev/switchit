<template>
  <ModalWindow v-if="modalComponent" :component="modalComponent" @closeModal="closeModal">
    <component :is="modalComponent" :props="componentProps" @closeModal="closeModal" @save="onSave"></component>
  </ModalWindow>

  <div class="main">
    <div class="container">
      <div class="header_options">
        <h1>Users</h1>
        <button class="invite-button" @click="openModal('EditUser', { mode: 'invite' })">Invite user</button>
      </div>

      <div class="table">
        <div class="table-header">
          <div class="table-header-content">User</div>
          <div class="table-header-content">Roles</div>
          <div class="table-header-content">Created</div>
          <div class="table-header-content">Last active</div>
          <div class="table-header-content">Status</div>
          <div class="table-header-content"></div>
        </div>

        <div class="table-rows">
          <div v-for="(user, index) in users" :key="index" class="table-row" @click="openModal('EditUser', { mode: 'edit' , user: user})">
            <div class="table-row-content">
              <div class="user-info">
                <div class="user-avatar">{{ user.initials }}</div>
                <div>
                  <div class="user-name">{{ user.fullName }}</div>
                  <div class="user-email">{{ user.email }}</div>
                </div>
              </div>
            </div>
            <div class="table-row-content">
              <div class="roles">
                <span v-for="role in user.roles" :key="role.id" class="role">{{ role.name }}</span>
              </div>
            </div>
            <div class="table-row-content">{{ formatDate(user.created) }}</div>
            <div class="table-row-content">{{ formatDate(user.last_active) }}</div>
            <div class="table-row-content">
              <span :class="['status', user.status.name.toLowerCase()]">{{ user.status.name }}</span>
            </div>
            <div class="table-row-content actions">
              <!-- <span class="material-symbols-outlined" @click="openModal('EditUser', { mode: 'edit' , user: user})">edit</span>
              <span class="material-symbols-outlined" @click="deleteUser(user)">delete</span> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from "vue";
import ModalWindow from "@/components/ui/ModalWindow.vue";
import EditUser from "@/pages/EditUser.vue";

export default {
  components: {
    ModalWindow,
    EditUser,
  },
  setup() {
    const users = ref([]);
    const modalComponent = ref(null);
    const componentProps = ref({});

    const instance = getCurrentInstance();
    const switchit = instance.appContext.config.globalProperties.$switchit
    let response = null
    const fetchUsers = async () => {
      try {
        if (switchit === 123) {
          response = await switchit.getUsers();
          console.log('response', response)
        }
        else {
          response = {
            data: [
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
        users.value = response.data.map(user => ({
          ...user,
          fullName: `${user.first_name} ${user.last_name}`,
          initials: `${user.first_name[0]}${user.last_name[0]}`
        }));
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleDateString();
    };

    const openModal = (component, props = {}) => {
      componentProps.value = props;
      modalComponent.value = component;
      console.log('props', componentProps.value)
    };
    const closeModal = () => {
      modalComponent.value = null;
    };

    const onSave = () => {
      fetchUsers();
      closeModal();
    };


    const deleteUser = (user) => {
      // Handle user deletion
      console.log(user)
    };

    onMounted(fetchUsers);

    return {
      users,
      ModalWindow,
      modalComponent,
      componentProps,
      formatDate,
      openModal,
      closeModal,
      onSave,
      deleteUser,
      EditUser,
    };
  }
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #f1f1f1;
  min-height: 100vh;
  padding: 120px 20px;
}

.container {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.header_options {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.invite-button {
  background-color: #00c6c6;
  border-radius: 25px;
  color: white;
  border: 0;
  padding: 10px 20px;
  cursor: pointer;
}

.table {
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #666;
  max-width: 100%;
  overflow: hidden;
}

.table-header,
.table-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.table-header {
  background-color: #546e7a;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.7);
}

.table-row {
  background-color: white;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background: #fafafa;
    transition: all 0.2s;
  }
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #00c6c6;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}

.roles {
  display: flex;
  gap: 5px;
}

.role {
  background-color: #546e7a;
  color: white;
  border-radius: 5px;
  padding: 2px 5px;
}

.status {
  border-radius: 5px;
  padding: 2px 5px;

  &.pending {
    background-color: #FFECB3;
    border: 1px solid #FFE082;
    color: #795548;
  }

  &.active {
    background-color: #B2DFDB;
    border: 1px solid #80CBC4;
    color: #00796B;
  }
}

.actions {
  display: flex;
  gap: 10px;
}

.material-icons {
  cursor: pointer;
}
</style>
