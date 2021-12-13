import { mapState } from 'vuex'
import { EntityTypeInfo } from '~/classes/entity/EntityTypeInfo'
import { Entity } from '~/models/entity'
import { Participant } from '~/models/participant'
import { rad2deg } from '~/util/math'

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
    title () {
      return this.entity.title ? this.entity.title : `${EntityTypeInfo[this.entity.type].label} #${this.entity.id}`
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
    },
    originOffset () {
      return this.getOffsetPoint(this.origin, this.target)
    },
    targetOffset () {
      return this.getOffsetPoint(this.target, this.origin)
    },
    angle () {
      const diffX = this.targetOffset.x - this.originOffset.x
      const diffY = this.targetOffset.y - this.originOffset.y
      return rad2deg(Math.atan2(diffY, diffX))
    },
    radius () {
      if (!this.entity) { return 0 }
      return Math.min(this.entity.width, this.entity.height) / 2
    }
  },
  methods: {
    scalePoints ({ width, height, points = [] }) {
      return points.map((v, i) => {
        const num = i % 2 === 0 ? width : height
        return (v / 100) * num
      })
    },
    getOffsetPoint (entity1, entity2) {
      if (entity1 == null || entity2 == null) {
        return
      }

      const diffX = entity2.x - entity1.x
      const diffY = entity2.y - entity1.y
      const angle = Math.atan2(diffY, diffX)

      const centerX = entity1.x + entity1.width / 2
      const centerY = entity1.y + entity1.height / 2
      const x = entity1.width * 0.6 * Math.cos(angle) + centerX
      const y = entity1.height * 0.6 * Math.sin(angle) + centerY

      return {
        x,
        y
      }
    }
  }
}
