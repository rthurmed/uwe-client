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
      <template
        v-for="(prop, key) in entityProps"
      >
        <v-divider
          v-if="prop.divider"
          :key="key"
        />
        <v-list-item
          v-else
          :key="key"
          @click="() => {}"
        >
          <v-list-item-content>
            <v-list-item-subtitle>
              {{ prop.label }}
            </v-list-item-subtitle>
            <v-list-item-title>
              <span v-if="prop.type == 'unix'">
                {{ entity[prop.name] | unix }}
              </span>
              <span v-else-if="prop.type == 'EntityType'">
                {{ EntityTypeInfo[entity[prop.name]].label }}
              </span>
              <span v-else-if="prop.type == 'bool'">
                {{ entity[prop.name] | boolyn }}
              </span>
              <span v-else-if="prop.type == 'number'">
                {{ entity[prop.name] }}
              </span>
              <span v-else-if="!!entity[prop.name]">
                {{ entity[prop.name] }}
              </span>
              <span v-else>
                -
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </template>
  </v-list>
</template>

<script>
import { Query } from '@vuex-orm/core'
import { Entity } from '~/models/entity'
import { EntityTypeInfo } from '~/models/enum/entity-type'

export default {
  data () {
    return {
      beforeUpdateHookId: null,
      entityId: null,
      EntityTypeInfo,
      entityProps: [
        {
          name: 'id',
          type: 'string',
          label: 'ID',
          immutable: true
        },
        {
          name: 'type',
          type: 'EntityType',
          label: 'Tipo'
        },
        {
          divider: true
        },
        {
          name: 'title',
          type: 'string',
          label: 'Titulo'
        },
        {
          name: 'x',
          type: 'number',
          label: 'X'
        },
        {
          name: 'y',
          type: 'number',
          label: 'Y'
        },
        {
          name: 'width',
          type: 'number',
          label: 'Largura'
        },
        {
          name: 'height',
          type: 'number',
          label: 'Altura'
        },
        {
          name: 'abstract',
          type: 'bool',
          label: 'Abstrato'
        },
        {
          divider: true
        },
        {
          name: 'originId',
          type: 'entity',
          label: 'Origem'
        },
        {
          name: 'targetId',
          type: 'entity',
          label: 'Destino'
        },
        {
          divider: true
        },
        {
          name: 'createdAt',
          type: 'unix',
          label: 'Criado em',
          immutable: true
        }
      ]
    }
  },
  computed: {
    entity () {
      return Entity.find(this.entityId)
    }
  },
  created () {
    this.beforeUpdateHookId = Query.on('beforeUpdate', (data, aux, entity) => {
      if (
        entity === 'participants' &&
        data.userId === this.$auth.user.sub
      ) {
        this.entityId = data.grabbedId
      }
    })
  },
  beforeDestroy () {
    Query.off(this.beforeUpdateHookId)
  }
}
</script>
