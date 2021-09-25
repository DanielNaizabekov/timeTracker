<template>
  <div class="record-explore">
    <template v-if="isLoading">
      <q-skeleton
        v-for="i in 5"
        :key="i"
        class="record-explore__item"
        type="QRange"
      />
    </template>

    <template v-else>
      <q-card
        v-for="record in records"
        :key="record._id"
        class="record-explore__item q-px-md q-py-sm"
        flat
        bordered
        @click="editRecord(record._id)"
      >
        {{ record.name }}
      </q-card>
    </template>

    <q-btn class="record-explore__button" label="add" flat @click="createRecord" />
  </div>

  <router-view />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { storeTypes } from '@/store/storeTypes'

export default {
  name: 'RecordExplore',

  inject: ['$routeNames'],

  data () {
    return {
      isLoading: false,
    }
  },

  computed: {
    ...mapGetters({
      records: storeTypes.records,
    }),
  },

  methods: {
    ...mapActions({
      getRecords: storeTypes.GET_RECORDS,
    }),

    createRecord () {
      this.$router.push(this.$routeNames.recordForm)
    },
    editRecord (id) {
      this.$router.push({
        ...this.$routeNames.recordForm,
        params: { id },
      })
    },
    async loadData () {
      this.isLoading = true
      await this.getRecords()
      this.isLoading = false
    }
  },

  created () {
    this.loadData()
  },
}
</script>

<style lang="scss" scoped>
.record-explore {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-wrap: wrap;
  max-height: 100%;
  align-content: flex-start;
  overflow: auto;
}

.record-explore__item {
  width: 300px;
}
</style>
