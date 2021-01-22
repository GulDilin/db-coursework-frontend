<template>
  <transition-group
    name="list-transition"
    tag="div"
    class="col-12 col-md-5 col-lg-3 col-xl-3 fill-height absolute z-3000"
  >
    <v-alert
      v-for="notification in notifications"
      :type="notification.type"
      :key="notification.id"
      tile
      width="100%"
      small
      dense
    >
      <v-row
        align="center"
        class="pa-0"
      >

        <v-col class="grow pa-0">
          <span
            v-if="notification.title"
            class="title d-block"
          >
            {{ notification.title }}
          </span>

          <span class="body-2">
            {{ notification.message }}
          </span>
        </v-col>

        <v-col class="shrink pa-0">
          <v-btn
            @click="deleteNotification(notification)"
            icon
            class="ml-auto d-inline"
          >
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-col>

      </v-row>
    </v-alert>
  </transition-group>
</template>

<script>
  export default {
    name: "NotificationsGroup",

    computed: {
      notifications() {
        return this.$store.getters.getNotifications;
      }
    },

    methods: {
      deleteNotification(notification) {
        this.$store.dispatch('DELETE_NOTIFICATION_WITH_ID', notification.id);
      }
    },
  };
</script>

<style scoped>
  .list-transition-enter, .list-transition-leave-to {
    opacity: 0;
    transform: translateX(50px);
  }

  .list-transition-leave-active {
    position: absolute;
  }
</style>