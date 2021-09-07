<template>
  <v-dialog
    v-model="show"
    :max-width="maxWidth"
    v-bind="$attrs"
  >
    <v-card id="DialogComponent">
      <div class="close-btn__wrapper">
        <v-btn
          v-if="displayCloseBtn"
          icon
          @click="show = false"
          aria-label="close"
        >
          <v-icon>
            close
          </v-icon>
        </v-btn>
      </div>
      <slot
        name="title"
        :icon="icon"
        :title="title"
      >
        <v-card-title class="d-flex justify-space-between">
          <div class="title">
            {{ title }}
          </div>
        </v-card-title>
      </slot>
      <slot
        name="text"
        :message="message"
      >
        <v-card-text
          class="content"
          v-html="message"
        />
      </slot>
      <slot
        name="actions"
        :actionsList="actionsList"
        :btnHeight="btnHeight"
        :btnClass="btnClass"
      >
        <v-card-actions>
          <div
            v-for="action in actionsList"
            :key="action.name"
          >
            <v-btn
              @click="returnHandler(action.name)"
              :aria-label="action.name"
              :class="btnClass ? btnClass : ''"
              :color="$vuetify.theme.dark ? (action.darkModeColor ? action.darkModeColor : '#6BACE4') : action.color"
              action.size
              :outlined="action.outlined"
              :height="btnHeight"
            >
              {{ action.name }}
            </v-btn>
          </div>
        </v-card-actions>
      </slot>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "Dialog",
  props: {
    openDialog: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: "675px"
    },
    title: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    actions: {
      type: Array,
      default() {
        return [];
      }
    },
    displayCloseBtn: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ""
    },
    btnClass: {
      type: String,
      default: ""
    },
    btnHeight: {
      type: String,
      default: "50"
    },
    returnHandler: {
      type: Function,
      default: name => {
        return name;
      }
    }
  },
  computed: {
    show: {
      get() {
        return this.openDialog;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      }
    },
    actionsList() {
      return this.actions;
    }
  }
};
</script>
<style lang="scss" scoped>

.v-card {
  position: relative;

  .close-btn__wrapper {
    position: absolute;
    top: 9px;
    right: 9px;
  }

  .v-card__title {
    padding: 24px 10px 0 24px;
    margin-bottom: 18px;
    color: #041e42 !important;

    .v-avatar {
      background-color: #C8DCF0 !important;
      margin-right: 6px;
    }
  }

  .content {
    padding: 0 24px;
    margin-bottom: 36px;
    font-size: 16px;
    line-height: 24px;
    color: #041e42 !important;
    background-color: unset !important;
  }

  .v-card__actions {
    display: flex;
    justify-content: flex-end;
    padding: 0 24px 24px 24px !important;

    .v-btn {
      margin-left: 12px !important;
      padding: 0 16px;
      color: #FFFFFF;
    }
  }

  .v-btn:focus {
    outline: 3px auto -webkit-focus-ring-color;
  }
}

.theme--dark {
  .content, .v-card__title {
    color: #4C4F55 !important;
    background-color: unset !important;
  }

  .v-card__title .v-avatar {
    background-color: #7EA0E4 !important;
  }

  .buttonText {
    color: #121212 !important;
  }
}
</style>