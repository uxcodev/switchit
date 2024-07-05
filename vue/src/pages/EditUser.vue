<template>
  <div class="">
    <div class="white">
      <h2>{{ props?.mode === 'edit' ? 'Edit User' : 'Invite User' }}</h2>

      <div v-if="!loaded">
        <LoaderAni />
      </div>

      <div v-else>
        <form v-if="form.status.name === 'Active' || props?.mode === 'invite'" @submit.prevent="submitForm" class="switchit-form med">
          <div class="group" v-if="props?.mode === 'edit'">
            <label for="status">Status</label>
            <div class="inline">
              <div class="status" :class="form.status.name.toLowerCase()">{{ form.status.name }}</div>
              <div v-if="form.status.name === 'Pending'" class="inline">
                <span class="link" @click="approveUser">Approve</span>
                <span class="link" @click="rejectUser">Reject</span>
              </div>
              <div v-else-if="form.status.name === 'Active'" class="inline">
                <span class="link" @click="deactivateUser">Deactivate</span>
              </div>
              <div v-else-if="form.status.name === 'Inactive'" class="inline">
                <span class="link" @click="reactivateUser">Reactivate</span>
              </div>
            </div>
          </div>
          <div class="group">
            <label for="firstName">Name</label>
            <div class="inline">
              <input v-model="form.first_name" placeholder="First name" type="text" id="firstName" class="input lg" />
              <input v-model="form.last_name" placeholder="Last name" type="text" id="lastName" class="input lg" />
            </div>
          </div>
          <div class="group">
            <label for="email">Email</label>
            <input v-model="form.email" placeholder="" type="email" id="email" class="input lg" />
          </div>
          <div class="group">
            <label for="roles">Roles</label>
            <Multiselect v-model="form.roles" mode="tags" :searchable="true" :close-on-select="false" :options="roleOptions" />
          </div>
          <div class="group">
            <label for="roles">Countries this user operates in</label>
            <Multiselect v-model="selectedCountries" mode="tags" :searchable="true" :close-on-select="false" :options="countriesOptions" @select="onCountrySelect" @remove="onCountryRemove" />
          </div>

          <!-- Select country to assign markets -->
          <div class="group" v-if="selectedCountries.length > 0">
            <label for="selectedCountry">Set service access for each country</label>
            <select v-model="selectedCountry" @change="onCountryChange" class="input select lg">
              <option v-for="country in countriesMarketsOoptions" :key="country.value" :value="country.value">
                {{ country.label }}
              </option>
            </select>
          </div>

          <!-- Markets served -->
          <div v-if="selectedCountry" class="group">
            <label for="">Services this user can access in {{ getCountryName(selectedCountry) }}</label>
            <div class="checkbox-group">
              <label v-for="(category, key) in categories" :key="key" class="checkbox-label">
                <input class="checkbox" type="checkbox" :checked="isCategorySelected(category.code)" :id="category.name" @change="toggleCategorySelection(category.code)" />{{ $t(key) }}
                <span class="checkmark"></span>
              </label>
            </div>
          </div>

          <button type="submit">Submit</button>
          <div class="button__cancel" @click="closeModal">Cancel</div>
          <div v-if="errors.length" class="msg_error">{{ errors[0] }}</div>
        </form>
        <div v-else>
          <form @submit.prevent="submitForm" class="switchit-form med">
            <div class="group" v-if="props?.mode === 'edit'">
              <label for="status">Status</label>
              <div class="inline">
                <div class="status" :class="form.status.name.toLowerCase()">{{ form.status.name }}</div>
                <div v-if="form.status.name === 'Pending'" class="inline">
                  <span class="link" @click="approveUser">Approve</span>
                  <span class="link" @click="rejectUser">Reject</span>
                </div>
                <div v-else-if="form.status.name === 'Active'" class="inline">
                  <span class="link" @click="deactivateUser">Deactivate</span>
                </div>
                <div v-else-if="form.status.name === 'Inactive'" class="inline">
                  <span class="link" @click="reactivateUser">Reactivate</span>
                </div>
              </div>
            </div>
            <div class="group">
              <label for="Name">Name:</label>
              <div>{{ form.first_name }} {{ form.last_name }}</div>
            </div>
            <div class="group">
              <label for="email">Email:</label>
              <div>{{ form.email }}</div>
            </div>
            <div class="group">
              <label for="roles">Roles:</label>
              <div>
                <span v-for="role in form.roles" :key="role.id">{{ role.name }}</span>
              </div>
            </div>
            <div class="group">
              <label for="countries">Countries:</label>
              <div>
                <span v-for="country in form.countries" :key="country">{{ country }}</span>
              </div>
            </div>

            <button type="submit">Submit</button>
            <div class="button__cancel" @click="closeModal">Cancel</div>
            <div v-if="errors.length" class="msg_error">{{ errors[0] }}</div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect';
import LoaderAni from '@/components/ui/LoaderAni.vue';
import bitwise from '@/helpers/bitwiseEncode';
// import { watch } from 'vue';

export default {
  components: {
    Multiselect,
    LoaderAni,
  },
  props: ["props"],
  data() {
    return {
      categories: this.$store.getters.categories,
      form: {
        first_name: this.props?.user?.first_name || '',
        last_name: this.props?.user?.last_name || '',
        email: this.props?.user?.email || '',
        roles: this.props?.user?.roles || [],
        countries: this.props?.user?.countries || [],
        status: this.props?.user?.status || ''
      },
      selectedCountries: [],
      selectedCountry: null,
      roleOptions: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
      countriesOptions: [],
      countriesMarketsOoptions: [{label: 'Select country', value: ''}],
      statusOptions: [
        { label: "Active", value: { id: 1, name: 'Active' } },
        { label: "Pending", value: { id: 2, name: 'Pending' } },
        { label: "Inactive", value: { id: 3, name: 'Inactive' } }
      ],
      loaded: true,
      errors: []
    };
  },
watch: {
  selectedCountries(newVal) {
    this.countriesMarketsOoptions = newVal.map(country => {
      const countryOptions = this.countriesOptions.find(c => c.value === country);
      return countryOptions
    });
    this.countriesMarketsOoptions.unshift({label: 'Select country', value: ''});
    // set selectedCountry to match newVal
    this.selectedCountry = newVal[newVal.length - 1];
    console.log('this.countriesMarketsOoptions', this.countriesMarketsOoptions)
  }
},
  methods: {
    validateForm() {
      this.errors = [];
      if (!this.form.first_name) this.errors.push('First name is required');
      if (!this.form.last_name) this.errors.push('Last name is required');
      if (!this.validateEmail(this.form.email)) this.errors.push('Valid email is required');
    },
    validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
      return re.test(String(email).toLowerCase());
    },
    submitForm() {
      this.validateForm();

      let form = { ...this.form };
      form.countries = form.countries.map(c => {
        return {
          country: c.country,
          serviceType: bitwise.bitwiseEncode(c.categories)
        }
      });

      alert(JSON.stringify(form));
      // if (this.errors.length === 0) {
      //   this.$emit('save', this.form);
      // }
    },
    closeModal() {
      this.$emit('closeModal');
    },
    approveUser() {
      this.form.status = { id: 1, name: 'Active' };
    },
    rejectUser() {
      this.form.status = { id: 3, name: 'Inactive' };
    },
    deactivateUser() {
      this.form.status = { id: 3, name: 'Inactive' };
    },
    reactivateUser() {
      this.form.status = { id: 1, name: 'Active' };
    },
    isCategorySelected(code) {
      const country = this.form.countries.find(c => c.country === this.selectedCountry);
      return country ? country.categories.includes(code) : false;
    },
    toggleCategorySelection(code) {
      const country = this.form.countries.find(c => c.country === this.selectedCountry);
      if (country) {
        const index = country.categories.indexOf(code);
        if (index > -1) {
          country.categories.splice(index, 1);
        } else {
          country.categories.push(code);
        }
      }
      console.log('this.form.countries', this.form.countries)
    },
    onCountrySelect(selected) {
      if (!this.form.countries.some(c => c.country === selected.value)) {
        this.form.countries.push({ country: selected, categories: [] });
      }
    },
    onCountryRemove(removed) {
      const index = this.form.countries.findIndex(c => c.country.code === removed.value);
      if (index > -1) {
        this.form.countries.splice(index, 1);
      }
      if (this.selectedCountry === removed.value) {
        this.selectedCountry = null;
      }
    },
    onCountryChange() {
      const country = this.form.countries.find(c => c.country.code === this.selectedCountry);
      if (country) {
        this.selectedCountryCategories = country.categories;
      }
    },
    getCountryName(code) {
      const country = this.countriesOptions.find(c => c.value === code);
      return country ? country.label : '';
    }
  },
  
  async created() {
    try {
      let countryCodes = await this.$switchit.getCountries();
      this.countriesOptions = countryCodes.map(country => ({
        label: country.name,
        value: country.code
      }));
    } catch (error) {
      this.$toast_error.show(error);
    }
  },
  async mounted() {
    this.selectedCountries = this.form.countries.map(c => c.country);
  }
};
</script>

<style lang="sass" scoped>
@import "/src/styles/variables.sass"
@import "/src/styles/mixins.sass"
@import "@vueform/multiselect/themes/default.css"

.main
  display: flex
  flex-direction: column
  align-items: center
  justify-content: flex-start
  background-color: #fafafa
  min-height: 100vh
  padding: 120px 20px 60px 20px
  top: 80px
  &.clip
    max-height: 100vh
    overflow: hidden

.back-button
  width: 100%
  button
    padding: 4px 8px

.container.white
  background-color: white
  padding: 50px
  border-radius: 10px
  @include shadow()

.group
  input:not(.reset)
    max-width: none

.input.lg
  width: 100%
  padding: 10px
  font-size: 16px

.icon
  background-color: #00c6c6
  color: white
  border: none
  padding: 10px 20px
  border-radius: 25px
  cursor: pointer
  margin-right: 10px

.msg_error
  color: red
  margin-top: 10px

.status 
  border-radius: 5px
  padding: 2px 5px

  &.pending 
    background-color: #FFECB3
    border: 1px solid #FFE082
    color: #795548
  
  &.active 
    background-color: #B2DFDB
    border: 1px solid #80CBC4
    color: #00796B

  &.inactive 
    background-color: #FFCDD2
    border: 1px solid #EF9A9A
    color: #C62828
  
.inline
  display: flex
  gap: 10px
  align-items: center

</style>
