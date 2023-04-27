export default {
  install(app) {
    app.config.globalProperties.$maxLength = (field) => {
      const values = {
        name: 100,
        firstName: 50,
        lastName: 50,
        phone: 20,
        address: 100,
        email: 100,
        shortInput: 20,
        medInput: 50,
        longInput: 100,
        shortMessage: 100,
        medMessage: 500,
        longMessage: 1000,
      }
      return values[field]
    }
  }
}