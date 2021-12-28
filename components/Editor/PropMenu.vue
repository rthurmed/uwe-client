<template>
  <v-menu
    v-if="currentEntity"
    absolute
    :close-on-click="false"
    :close-on-content-click="false"
    :value="show"
    :position-x="x"
    :position-y="y"
  >
    <v-card min-width="230">
      <v-card-title>
        <span>
          {{ EntityTypeInfo[currentEntity.type].label }} #{{ currentEntity.id }}
        </span>
        <v-spacer />
        <v-btn
          id="propmenu-close"
          icon
          small
          @click="$emit('update:show', false)"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text v-if="props.length > 0">
        <v-form @submit.prevent="submit">
          <template v-for="(prop, index) in props">
            <v-switch
              v-if="EntityPropInfo[prop].type == 'bool'"
              :id="`propmenu-edit-${prop}`"
              :key="index"
              v-model="values[prop]"
              :label="`${EntityPropInfo[prop].label}: ${$options.filters.boolyn(values[prop])}`"
              @keydown.esc="$emit('update:show', false)"
            />
            <v-text-field
              v-else-if="EntityPropInfo[prop].type == 'number'"
              :id="`propmenu-edit-${prop}`"
              :key="index"
              v-model="values[prop]"
              :label="EntityPropInfo[prop].label"
              type="number"
              :autofocus="index == 0"
              @keydown.esc="$emit('update:show', false)"
            />
            <v-autocomplete
              v-else-if="EntityPropInfo[prop].type == 'entity'"
              :id="`propmenu-edit-${prop}`"
              :key="index"
              v-model="values[prop]"
              :label="EntityPropInfo[prop].label"
              :items="entitiesOptions"
              :autofocus="index == 0"
              @keydown.esc="$emit('update:show', false)"
            />
            <v-text-field
              v-else
              :id="`propmenu-edit-${prop}`"
              :key="index"
              v-model="values[prop]"
              :label="EntityPropInfo[prop].label"
              :autofocus="index == 0"
              @keydown.esc="$emit('update:show', false)"
            />
          </template>
          <v-btn
            id="propmenu-submit"
            block
            type="submit"
          >
            Enviar
          </v-btn>
        </v-form>
      </v-card-text>
      <template v-if="Object.keys(quickCreates).length">
        <v-divider />
        <v-subheader>
          Ações rápidas:
        </v-subheader>
        <v-toolbar elevation="0">
          <v-tooltip
            v-for="type in Object.keys(quickCreates)"
            :key="type"
            bottom
          >
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                @click="executeQuickCreate(type)"
              >
                <v-img
                  max-width="24"
                  contain
                  :src="EntityTypeInfo[type].icon"
                />
              </v-btn>
            </template>
            <span>
              Nova {{ EntityTypeInfo[type].label }}
            </span>
          </v-tooltip>
        </v-toolbar>
      </template>
    </v-card>
  </v-menu>
</template>

<script>
import Vue from 'vue'
import { Entity } from '~/models/entity'
import { EntityPropInfo } from '~/classes/entity/EntityPropInfo'
import { EntityTypeInfo } from '~/classes/entity/EntityTypeInfo'

export default {
  props: {
    show: {
      type: Boolean,
      default: () => false
    },
    entity: {
      type: Number,
      default: () => 0
    },
    props: {
      type: Array,
      default: () => ['title']
    },
    quickCreates: {
      type: Object,
      default: () => {}
    },
    x: {
      type: Number,
      default: () => 0
    },
    y: {
      type: Number,
      default: () => 0
    }
  },
  data () {
    return {
      EntityPropInfo,
      EntityTypeInfo,
      values: {}
    }
  },
  computed: {
    currentEntity () {
      return Entity.find(this.entity)
    },
    entities () {
      if (!this.currentEntity) {
        return []
      }
      const { linkableTypes } = EntityTypeInfo[this.currentEntity.type]
      return Entity
        .query()
        .where('diagramId', this.currentEntity.diagramId)
        .where('type', t => linkableTypes.includes(t))
        .get()
    },
    entitiesOptions () {
      const options = this.entities.map(e => ({
        value: e.id,
        text: e.title ? e.title : `${EntityTypeInfo[e.type].label} #${e.id}`
      }))
      options.unshift({
        value: null,
        text: '-'
      })
      return options
    }
  },
  watch: {
    entity: 'copyValue',
    props: 'copyValue'
  },
  methods: {
    // Copies the value from the entity to the temporary variable
    copyValue () {
      if (this.currentEntity == null) {
        return
      }
      this.values = {}
      this.props.forEach((prop) => {
        Vue.set(this.values, prop, this.currentEntity[prop])
      })
    },
    submit () {
      const entity = { ...Entity.find(this.entity) }
      this.props.forEach((prop) => {
        entity[prop] = this.values[prop]
      })
      this.$socket.emit('patch', entity)
      this.$emit('update:show', false)
    },
    executeQuickCreate (type) {
      if (!(type in this.quickCreates)) {
        return
      }
      this.$emit('create', type, this.quickCreates[type](this.currentEntity))
    }
  }
}
</script>
