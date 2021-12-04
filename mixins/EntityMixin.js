import { mapState } from 'vuex'
import { Entity } from '~/models/entity'
import { Participant } from '~/models/participant'

export default {
  props: {
    entityId: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState(['style', 'currentParticipant']),
    entity () {
      return Entity.find(this.entityId)
    },
    grabbed () {
      return Participant
        .query()
        .where('id', this.currentParticipant)
        .where('grabbedId', this.entityId)
        .count() > 0
    },
    stroke () {
      const participant = Participant
        .query()
        .where('grabbedId', this.entityId)
        .first()
      if (!participant) {
        return this.style.box.stroke
      }
      return this.$color(participant.id)
    },
    selected () {
      return Participant
        .query()
        .where('grabbedId', this.entityId)
        .count() > 0
    },
    origin () {
      if (!this.entity) { return null }
      return Entity.find(this.entity.originId)
    },
    target () {
      if (!this.entity) { return null }
      return Entity.find(this.entity.targetId)
    }
  },
  methods: {
    scalePoints ({ width, height, points = [] }) {
      return points.map((v, i) => {
        const num = i % 2 === 0 ? width : height
        return (v / 100) * num
      })
    }
  }
}
