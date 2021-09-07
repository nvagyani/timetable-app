<!-- Component for filter options (Checkbox and radio seclection controls) -->
<template>
  <v-menu
    v-model="menu"
    bottom
    right
    transition="scale-transition"
    origin="top left"
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on }">
      <a href="#" @click="menu = true" aria-label="Filter by start date range">
        <v-chip
          class="chip"
          :class="selectedFilterOptions ? 'selected' : ''"
          outlined
          v-on="on"
        >
          {{ label }}
          <v-icon>arrow_drop_down</v-icon>
        </v-chip>
      </a>
    </template>
      <v-card class="filterOptions" width="630px" :height="cardHeight">
        <v-list>
          <v-list-item>
            <v-list-item-title>
              <strong>Filter start date range</strong>
            </v-list-item-title>
            <v-list-item-action>
              <a
                href="#"
                @click="menu = false"
                class="dialogCloseBtn"
                aria-label="Close filter options menu"
              >
                <v-icon class="text-right closeBtn">mdi-close</v-icon>
              </a>
            </v-list-item-action>
          </v-list-item>
          <div class="datePickerRange" v-if="!resetPickers">
             <v-date-picker
              v-model="rangeDateOptions"
              rangeSeparatorText=""
              :startDatePickerAttrs="{ label: 'From' }"
              :endDatePickerAttrs="{ label: 'To' }"
              @date-picker-activated="datePickerActivated"
              @input="dateRangeUpdate"
              range
             >
             </v-date-picker>
            <div class="pb-4 clearfilter" v-if="cardHeight === 'auto'">
              <a href="#" @click="clearFilter">Clear dates</a>
            </div>
          </div>
        </v-list>
      </v-card>
  </v-menu>
</template>

<script>

export default {
  name: 'DateFilter',
  props: {
    filterOptions: {
      type: Object,
      default: () => {}
    },
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      menu: false,
      selectedOptions: [],
      rangeDateOptions: [],
      cardHeight: 'auto',
      dataPickerActivated: {
        start: false,
        end: false
      },
      resetPickers: false,
      isActive: false
    }
  },
  watch: {
    // clear selected filters on change of school switcher
    filterOptions(newVal, oldVal) {
      if (newVal && oldVal && newVal.toString() === oldVal.toString()) {
        // don't clear the filters ( back to list view button)
        return
      }
      this.rangeDateOptions = []
    },
    menu(opened) {
      this.isActive = opened
      this.$emit('menuOpened', opened)
    }
  },
  computed: {
    selectedFilterOptions() {
      let isSelected = false
      if (this.rangeDateOptions.length === 2) {
        isSelected = !!this.rangeDateOptions[0] && !!this.rangeDateOptions[1]
      }
      return isSelected ? true : false
    }
  },
  methods: {
    clearFilter() {
      this.rangeDateOptions = []
      this.$emit('updatefilter', this.rangeDateOptions)

      // force pickers to re-render so that the internal dates get reset
      this.resetPickers = true
      this.$nextTick(() => {
        this.resetPickers = false
      })
    },
    datePickerActivated(activated, datePicker) {
      this.datePickerActivated[datePicker] = activated
      this.cardHeight =
        this.datePickerActivated.start || this.datePickerActivated.end
          ? '530px'
          : 'auto'
    },
    dateRangeUpdate([start, end]) {
      if (!!start && !!end) {
        this.$emit('updatefilter', [start, end])
      } else {
        this.$emit('updatefilter', [])
      }
    }
  }
}
</script>

<style scoped lang="scss">
.v-chip.chip.v-chip--outlined {
  border-color: #6D7079;
  background-color: white !important;
  color: #6D7079;
}
.v-chip.chip.v-chip--outlined.selected {
  background-color: #c8dcf0 !important;
  color: #041e42;
}
.checkFilter {
  margin-top: 2px;
}
.dialogCloseBtn {
  margin-right: 3px;
}
a {
  text-decoration: none;
}

::v-deep .filterOptions .theme--light.v-label {
  color: #041e42;
  font-weight: 700;
}

::v-deep .v-list-item__title {
  font-size: 1.125rem;
}

.datePickerRange {
  width: 100%;
  margin-left: 20px;
}

.closeBtn {
  color: #041e42;
}
.clearfilter {
  font-size: 14px;
  font-weight: bold;
  a {
    text-decoration: underline;
  }
}

::v-deep div.v-picker--date {
  button:not(.v-btn--outlined):not(:focus) {
    border: none;
  }
}
</style>
