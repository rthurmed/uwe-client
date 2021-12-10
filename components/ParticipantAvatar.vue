<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-avatar
        :color="$color(participantId)"
        v-bind="attrs"
        v-on="on"
      >
        <span v-if="user">
          {{ user.firstName[0] || '' }}{{ user.lastName[0] || '' }}
        </span>
      </v-avatar>
    </template>
    <span v-if="user">
      <span v-if="currentParticipant == participantId">
        (Você)
      </span>
      {{ user.firstName }}
      {{ user.lastName }}
      <br>
      {{ user.email }}
    </span>
  </v-tooltip>
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
