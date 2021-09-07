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
      <a href="#" @click="menu = true" :aria-label="chipLabel">
        <v-chip
          class="chip"
          :disabled="!filterOptions.length"
          :class="selectedFilterOptions ? 'selected' : ''"
          outlined
          v-on="on"
        >
          {{ label }}
          <v-icon>arrow_drop_down</v-icon>
        </v-chip>
      </a>
    </template>
      <v-card class="filterOptions" width="250px">
        <v-list>
          <v-list-item>
            <v-list-item-title><strong>Show only</strong></v-list-item-title>
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
          <div>
            <v-list-item
              v-for="filter in filterOptionsInternal"
              :key="filter.value"
            >
              <v-checkbox
                v-model="selectedOptions"
                :label="filter.label"
                :value="filter.value"
                class="checkFilter"
                @click="$emit('updatefilter', selectedOptions)"
              />
            </v-list-item>
          </div>
        </v-list>
      </v-card>
  </v-menu>
</template>

<script>

export default {
  name: 'ListViewFilter',
  props: {
    filterOptions: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'checkbox'
    },
    showDefaultFilter: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      menu: false,
      selectedOptions: [],
      radioOption: null,
      isActive: false
    }
  },
  created() {
    // y67t set default filter - display applications for the current year
    if (this.showDefaultFilter && this.showDefaultFilter.length > 0) {
      this.selectedOptions = this.showDefaultFilter
    }
  },
  computed: {
    selectedFilterOptions() {
      if (this.type === 'checkbox') {
        return this.selectedOptions.length ? true : false
      }
      if (this.type === 'radio') {
        return this.radioOption ? true : false
      }
      return false
    },
    chipLabel() {
      return `Filter by ${this.label}`
    },
    filterOptionsInternal() {
      return this.filterOptions.map(option =>
        typeof option === 'object' ? option : { value: option, label: option }
      )
    },
    schoolCode() {
      return this.$store.getters.selectedSchoolCode
    }
  },
  methods: {
    clearFilter() {
      if (this.type === 'radio') {
        this.radioOption = null
        this.$emit('updatefilter', this.radioOption)
      } else {
        this.selectedOptions = []
        this.$emit('updatefilter', this.selectedOptions)
      }
    },
    updateList(selectedOptions) {
        console.log('updateList', selectedOptions)
        this.$emit('updatefilter', selectedOptions)
    }
  }
}
</script>

<style scoped lang="scss">
.v-chip.chip.v-chip--outlined {
  border-color: #6D7079;;
  background-color: white !important;
  color:#6D7079;;
}
.v-chip.chip.v-chip--outlined.selected {
  background-color: #c8dcf0 !important;
  color: #041e42;
}
.checkFilter {
  margin-top: 2px;
}
a {
  text-decoration: none;
}

::v-deep .filterOptions .theme--light.v-label {
  color: #121212;
}

::v-deep .v-list-item__title {
  font-size: 16px;
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
</style>
