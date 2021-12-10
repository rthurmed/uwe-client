<template>
  <v-list-item
    v-bind="$attrs"
    v-on="$listeners"
  >
    <v-list-item-avatar>
      <v-avatar :color="$color(participantId)">
        <span v-if="user">
          {{ user.firstName[0] || '' }}{{ user.lastName[0] || '' }}
        </span>
      </v-avatar>
    </v-list-item-avatar>
    <v-list-item-content v-if="user">
      <v-list-item-title>
        <span v-if="currentParticipant == participantId">
          (Você)
        </span>
        {{ user.firstName }}
        {{ user.lastName }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ user.email }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { mapState } from 'vuex'
import { Participant } from '~/models/participant'
import { User } from '~/models/user'
export default {
  props: {
    participantId: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState(['currentParticipant']),
    participant () {
      return Participant.find(this.participantId)
    },
    user () {
      return User.find(this.participant.userId)
    }
  },
  watch: {
    participantId: {
      handler (value) {
        const { userId } = Participant.find(value)
        if (User.find(userId) == null) {
          // Fetch if didnt loaded yet
          User.api().get(`${User.entity}/${userId}`)
        }
      },
      immediate: true
    }
  }
}
</script>
