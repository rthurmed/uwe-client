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
    ...mapState(['style']),
    entity () {
      return Entity.find(this.entityId)
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
  }
}
