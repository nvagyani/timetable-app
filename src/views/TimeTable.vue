<template>
    <div>
      <v-container fluid>
        <h1 class="mb-8">Timetable</h1>
        <v-card class="container">
        <div data-app class="filters">
          Filter by:
          <span class="filter">
            <DateFilter label="Date" />
          </span>
          <span class="filter">
            <ListViewFilter
              label="From"
              type="checkbox"
              :filterOptions="fromFilters"
              v-on:updatefilter="updateFromFilter"
            />
          </span>
          <span class="filter">
            <ListViewFilter
              label="To"
              type="checkbox"
              class="filter"
              :filterOptions="toFilters"
              v-on:updatefilter="updateToFilter"
            />
          </span>
        </div>
        <div class="datatable">
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            single-line
            hide-details
            label="Search by location"
            class="searchinput"
          ></v-text-field>
          <DataTable
            :headers="headers"
            :items="listData"
            :search="search"
            sort-by="date"
            sort-desc
            @click:row="rowAction"
          ></DataTable>
        </div>
      </v-card>
      <Dialog
        :openDialog="openDialog"
        :title="heading"
        maxWidth="520px"
        icon="security"
        :displayCloseBtn="true"
        :message="message"
        :actions="actions"
        @close="openDialog=false"
        :return-handler="handleDialogReturn"
      />
      </v-container>
    </div>
</template>

<script>
import timetabledata from '../data/timetabledata'
import ListViewFilter from '../components/ListViewFilter'
import DateFilter from '../components/DateFilter'
import DataTable from '../components/DataTable'
import Dialog from '../components/Dialog'

export default {
  name: 'LoginView',
   components: {
    DataTable,
    ListViewFilter,
    DateFilter,
    Dialog
  },
  data: function() {
    return {
      search: '',
      headers: [
        { text: 'Date', value: 'date' },
        { text: 'From', value: 'from' },
        { text: 'To', value: 'to' },
        { text: 'Departures', value: 'departures' }
      ],
      selectedFromLocations: [],
      selectedToLocations: [],
      openDialog: false,
      actions: [
        { name: "Cancel", color:"#041E42", size: "large", outlined: true },
        { name: "Ok", color:"#041E42", size: "large", outlined: false }
      ],
      heading: '',
      message: ''
    };
  },
  computed: {
    items() {
      return timetabledata
    },
    listData() {
      return timetabledata.filter(a => {
        let From = this.selectedFromLocations.length
            ? this.selectedFromLocations.includes(a.from)
            : true,
          To = this.selectedToLocations.length
            ? this.selectedToLocations.includes(a.to)
            : true
        return From && To
      })
    },
    fromFilters() {
      const fromList = [
        ...new Set(this.items.map(item => item.from))
      ]
      return fromList.sort()
    },
    toFilters() {
      const fromList = [
        ...new Set(this.items.map(item => item.to))
      ]
      return fromList.sort()
    }
  },
  methods: {
    updateFromFilter(selectedOptions) {
      this.selectedFromLocations = selectedOptions
    },
    updateToFilter(selectedOptions) {
      this.selectedToLocations = selectedOptions
    },
    handleDialogReturn() {
      this.openDialog = false
    },
    rowAction(item) {
      this.openDialog = true
      this.heading = `${item.from} - ${item.to}`
      this.message = `Departures - ${item.departures} for date ${item.date}`
    }
  }
}
</script>
<style scoped>
.container {
  padding: 20px;
  margin: 20px auto;
}
.filters{
  text-align: left;
}
.filter {
  padding-right: 10px;
}
.datatable {
  border: 1px solid#c8dcf0;
  margin: 20px 0;
}
.searchinput{
  padding:15px;
  border-bottom: 1px solid#c8dcf0;
}
::v-deep .v-text-field > .v-input__control > .v-input__slot:before{
  border-width:0;
  border-color: transparent;
}
::v-deep .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th{
  font-size: 1rem;
  font-weight: bold;
}
::v-deep .theme--light.v-data-table .v-data-footer{
  padding: 10px;
  text-align: right;
  justify-content: flex-end;
}
</style>
