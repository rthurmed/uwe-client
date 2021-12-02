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
          v-if="prop.divider"
          :key="key"
        />
        <v-list-item
          v-else
          :key="key"
          :disabled="prop.immutable"
          @click="(e) => handlePropClick(e, key)"
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
      <v-divider />
      <v-list-item @click="remove">
        <v-list-item-content>
          <v-list-item-subtitle>
            Remover esta entidade
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <!-- MENU EDIT PROP -->
      <!-- TODO: Move to another component -->
      <v-menu
        absolute
        :close-on-click="false"
        :close-on-content-click="false"
        :value="editMenu.show"
        :position-x="editMenu.x"
        :position-y="editMenu.y"
      >
        <v-card min-width="230">
          <v-card-title>
            <span>
              {{ entityProps[editMenu.prop].label }}
            </span>
            <v-spacer />
            <v-btn
              icon
              small
              @click="editMenu.show = false"
            >
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitEditMenu">
              <!-- TODO: Adapt this form to the current prop being edited -->
              <v-switch
                v-if="entityProps[editMenu.prop].type == 'bool'"
                v-model="editMenu.value"
                :label="$options.filters.boolyn(editMenu.value)"
              />
              <v-text-field
                v-else-if="entityProps[editMenu.prop].type == 'number'"
                v-model="editMenu.value"
                type="number"
              />
              <v-text-field
                v-else
                v-model="editMenu.value"
              />
              <v-btn
                block
                type="submit"
              >
                Enviar
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-menu>
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
      editMenu: {
        show: false,
        prop: 0,
        value: 0,
        x: 0,
        y: 0
      },
      // TODO: Make immutable based on entity type
      // TODO: Allow types to define which type can be connected as origin and target
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
          label: 'Tipo',
          immutable: true
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
  watch: {
    entityId (value) {
      if (value == null) {
        this.editMenu.show = false
      }
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
  },
  methods: {
    remove () {
      this.$socket.emit('delete')
    },
    handlePropClick (e, propKey) {
      if (this.entityProps[propKey].immutable) {
        return
      }
      this.editMenu.x = e.clientX
      this.editMenu.y = e.clientY
      this.editMenu.prop = propKey

      // Copy entity value into temporary variable before showing
      this.editMenu.value = this.entity[this.entityProps[propKey].name]
      this.editMenu.show = true
    },
    submitEditMenu () {
      const key = this.entityProps[this.editMenu.prop].name
      const value = this.editMenu.value
      const entity = { ...this.entity }
      entity[key] = value
      this.$socket.emit('patch', entity)
      this.editMenu.show = false
    }
  }
}
</script>
