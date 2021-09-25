<template>
  <q-dialog
    class="record-form"
    v-model="isDrawerOpen"
    position="right"
    seamless
    full-height
    @hide="closeDrawer"
  >
    <q-card class="record-form__card" flat bordered>
      <q-card-section class="record-form__header q-pa-xs">
        <q-btn class="record-form__close" label="close" flat v-close-popup />
      </q-card-section>

      <q-separator class="record-form__separator" />

      <div class="record-form__loader">
        <q-linear-progress v-show="isLoading" indeterminate color="indigo-5" />
      </div>

      <q-card-section class="record-form__body">
        <q-form class="record-form__form" @submit="submit">
          <q-input
            class="record-form__form-input"
            v-model="form.name"
            placeholder="Name"
            color="blue-grey-10"
            :error="Boolean(validationErrors(recordValidations.name))"
            :error-message="validationErrors(recordValidations.name)"
            outlined
            dense
            square
          />

          <q-input
            class="record-form__form-input"
            v-model="form.date"
            placeholder="Date"
            color="blue-grey-10"
            mask="date"
            :error="Boolean(validationErrors(recordValidations.date))"
            :error-message="validationErrors(recordValidations.date)"
            outlined
            dense
            square
          >
            <template #append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date v-model="form.date">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
            class="record-form__form-input"
            v-model="form.duration"
            placeholder="Duration"
            color="blue-grey-10"
            :error="Boolean(validationErrors(recordValidations.duration))"
            :error-message="validationErrors(recordValidations.duration)"
            outlined
            dense
            square
          />

          <q-btn
            class="record-form__form-button full-width no-border-radius"
            label="Submit"
            type="submit"
            color="indigo-5"
            outline
            :disable="isLoading"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import moment from 'moment'

import { mapActions } from 'vuex'
import { required } from '@vuelidate/validators'

import prepareErrors from '@/mixins/prepareErrors.mixin.js'

import { storeTypes } from '@/store/storeTypes'
import { recordValidations } from '@/utils/validationOptions'
import { dateFormat } from '@/utils/validations'

export default {
  name: 'RecordForm',

  inject: ['$routeNames'],

  props: {
    id: {
      type: [String, Number],
    },
  },

  setup () {
    return { v$: useVuelidate() }
  },

  mixins: [prepareErrors],

  data () {
    return {
      recordValidations,
      isDrawerOpen: true,
      isLoading: false,
      form: {
        name: '',
        date: '',
        duration: '',
      },
    }
  },

  validations: {
    form: {
      name: { required },
      date: { required, date: dateFormat },
      duration: { required },
    },
  },

  computed: {
    isEditing () {
      return Boolean(this.id)
    },
  },

  watch: {
    id () {
      this.loadData()
    },
  },

  methods: {
    ...mapActions({
      getRecordById: storeTypes.GET_RECORD_BY_ID,
      createRecord: storeTypes.CREATE_RECORD,
      updateRecord: storeTypes.UPDATE_RECORD,
    }),

    closeDrawer () {
      this.$router.push(this.$routeNames.recordExplore)
    },
    async loadData () {
      let recordData = {}

      if (this.isEditing) {
        this.isLoading = true

        try {
          recordData = await this.getRecordById(this.id)
        } catch {
          this.$q.notify('An error has occurred')
          this.isDrawerOpen = false
        }

        this.isLoading = false
      }

      const form = {}
      Object.keys(this.form).forEach(fieldName => {
        form[fieldName] = recordData[fieldName] || ''
      })
      form.date = form.date || moment().format('YYYY/MM/DD')
      this.form = form
    },
    async submit () {
      if (!this.isValidForm()) {
        return
      }

      this.isLoading = true

      try {
        if (this.isEditing) {
          await this.updateRecord({ id: this.id, data: this.form })
        } else {
          await this.createRecord(this.form)
        }
      } catch (e) {
        console.log(e);
        this.$q.notify('An error has occurred')
      }

      this.isLoading = false
    },
  },

  created () {
    this.loadData()
  },
}
</script>

<style lang="scss" scoped>
.record-form__card {
  min-width: 420px;
  border-width: 0 0 0 1px;
}

.record-form__form {
  & > :not(:last-child) {
    margin-bottom: 16px;
  }
}

.record-form__loader {
  position: absolute;
  width: 100%;
}
</style>

<style lang="scss">
.record-form {
  .q-dialog__inner {
    padding: 0;
  }
}
</style>