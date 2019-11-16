<template>
  <div class="computedDate">
    <v-dialog
      ref="dialog"
      v-model="modal"
      width="290px"
    >
      <template v-slot:activator="{ on }">
        <div :class="{'emptyDate': !hasDateModel}" v-on="on">
          {{ computedDateFormat }}
        </div>
      </template>
      <v-date-picker
        v-model="dateModel"
        no-title
        @change="save"
      />
    </v-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import _isEmpty from 'lodash/isEmpty'

dayjs.locale('ru')

export default {
  props: {
    date: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      dateModel: '',
      modal: false
    }
  },

  computed: {
    computedDateFormat () {
      return this.dateModel
        ? dayjs(this.dateModel).format('DD MMMM YYYY')
        : 'Выберите дату'
    },
    hasDateModel () {
      return !_isEmpty(this.dateModel)
    }
  },

  created () {
    this.dateModel = this.date
  },

  methods: {
    save (date) {
      this.$refs.dialog.save(date)
    }
  }
}
</script>

<style scoped>
.computedDate {
  height: 135px;
}

.emptyDate {
  color: #E3F2FD;
}
</style>
