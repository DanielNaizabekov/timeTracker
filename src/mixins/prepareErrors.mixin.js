export default {
  computed: {
    validationErrors() {
      return ({ path, methods, hints }) => {
        const inputValue = path.split('.').reduce((obj, key) => obj && obj[key] || null, this.v$)

        let error = ''
        if (!inputValue.$dirty) return error
        methods.forEach( method => inputValue[method].$invalid && (error = hints[method]) )

        return error
      }
    },
  },
  methods: {
    isValidForm () {
      this.v$.$touch()
      return !this.v$.$invalid
    },
  },
}
