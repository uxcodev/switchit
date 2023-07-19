export default {
  state: {
    people: [],
    names: [],
  },
  mutations: {
    addPerson(state, person) {
      state.people.push(person);
    },
    deletePerson(state, index) {
      state.people.splice(index, 1);
    },
    setPeople(state, people) {
      state.people = people;
    },
    setNames(state, names) {
      state.names = names;
    }
  },
  actions: {
    addPerson(context, person) {
      context.commit('addPerson', person);
    },
    setPeople(context, people) {
      context.commit('setPeople', people);
    },
    deletePerson(context, index) {
      context.commit('deletePerson', index);
    },
    setNames(context, names) {
      context.commit('setNames', names);
    }
  },
  getters: {
    people(state) {
      return state.people;
    },
    getPersonById: (state) => (id) => {
      return state.people.find(person => person.id === id);
    },
    names(state) {
      return state.names;
    }
  }
}