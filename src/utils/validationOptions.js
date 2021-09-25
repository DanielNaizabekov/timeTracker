export const recordValidations = {
  name: {
    path: 'form.name',
    methods: ['required'],
    hints: {
      required: 'Name is required',
    },
  },
  date: {
    path: 'form.date',
    methods: ['required', 'date'],
    hints: {
      required: 'Date is required',
      date: 'Type date',
    },
  },
  duration: {
    path: 'form.duration',
    methods: ['required'],
    hints: {
      required: 'Duration is required',
    },
  },
}
