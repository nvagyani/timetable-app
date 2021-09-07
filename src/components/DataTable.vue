<template>
  <v-data-table
    ref="vDataTable"
    :headers="headers"
    class="dataTable"
    :no-results-text="noResultsFound"
    :sort-by.sync="sortBy"
    v-on="$listeners"
    v-bind="$attrs"
  >
  </v-data-table>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    searchLabel: {
      type: String,
      default: 'Search'
    },
    searchAriaLabel: {
      type: String,
      default: ''
    },
    sortBy: {
      type: String,
      default: () => ''
    },
    noResultsFound: {
      type: String,
      default: () => 'No results found. Try removing some filters or clearing the keyword search.'
    }
  },
  data() {
    return {
    }
  }
}
</script>
