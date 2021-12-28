<template>
  <v-list subheader>
    <v-subheader>
      Inspecionar entidade
    </v-subheader>
    <v-list-item v-if="!entity">
      <v-list-item-content>
        <p class="text--disabled">
          Nenhum entidade selecionada. Clique em algum elemento para inspecioná-lo.
        </p>
      </v-list-item-content>
    </v-list-item>
    <template v-else>
      <template v-for="(prop, key) in entityProps">
        <v-divider
          v-if="prop == '--'"
          :key="key"
        />
        <v-list-item
          v-else
          :id="`inspect-edit-${prop}`"
          :key="key"
          :disabled="EntityPropInfo[prop].immutable"
          @click="(e) => handlePropClick(e, prop)"
        >
          <v-list-item-content>
            <v-list-item-subtitle>
              {{ EntityPropInfo[prop].label }}
            </v-list-item-subtitle>
            <v-list-item-title :id="`inspect-edit-${prop}-value`">
              <span v-if="EntityPropInfo[prop].type == 'unix'">
                {{ entity[prop] | unix }}
              </span>
              <span v-else-if="EntityPropInfo[prop].type == 'EntityType'">
                {{ EntityTypeInfo[entity[prop]].label }}
              </span>
              <span v-else-if="EntityPropInfo[prop].type == 'bool'">
                {{ entity[prop] | boolyn }}
              </span>
              <span v-else-if="EntityPropInfo[prop].type == 'number'">
                {{ entity[prop] }}
              </span>
              <span v-else-if="EntityPropInfo[prop].type == 'entity'">
                {{ entity[prop] | entityById }}
              </span>
              <span v-else-if="!!entity[prop]">
                {{ entity[prop] }}
              </span>
              <span v-else>
                -
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider />
      <v-list-item
        id="inspect-remove"
        @click="remove"
      >
        <v-list-item-content>
          <v-list-item-subtitle>
            Remover esta entidade
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
import { mapState } from 'vuex'
import { Entity } from '~/models/entity'
import { Participant } from '~/models/participant'
import { EntityProp } from '~/classes/entity/EntityProp'
import { EntityPropInfo } from '~/classes/entity/EntityPropInfo'
import { EntityTypeInfo } from '~/classes/entity/EntityTypeInfo'

export default {
  filters: {
    entityById (id) {
      const entity = Entity.find(id)
      if (!entity) {
        return '-'
      }
      if (!entity.title) {
        return `${EntityTypeInfo[entity.type].label} #${id}`
      }
      return entity.title
    }
  },
  data () {
    return {
      EntityTypeInfo,
      EntityPropInfo,
      entityProps: [
        EntityProp.ID,
        EntityProp.TYPE,
        '--',
        EntityProp.TITLE,
        EntityProp.X,
        EntityProp.Y,
        EntityProp.WIDTH,
        EntityProp.HEIGHT,
        EntityProp.ABSTRACT,
        '--',
        EntityProp.ORIGINID,
        EntityProp.TARGETID,
        '--',
        EntityProp.CREATEDAT
      ]
    }
  },
  computed: {
    ...mapState(['currentParticipant']),
    entity () {
      const participant = Participant
        .query()
        .where('id', this.currentParticipant)
        .first()
      if (!participant) {
        return null
      }
      return Entity.find(participant.grabbedId)
    }
  },
  methods: {
    remove () {
      this.$socket.emit('delete')
    },
    handlePropClick (e, prop) {
      if (EntityPropInfo[prop].immutable) {
        return
      }
      const id = this.entity.id
      const x = e.clientX
      const y = e.clientY

      this.$emit('edit', { id, x, y, props: [prop] })
    }
  }
}
</script>
