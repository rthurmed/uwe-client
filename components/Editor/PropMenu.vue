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
          icon
          small
          @click="$emit('update:show', false)"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text v-if="props.length > 0">
        <v-form @submit.prevent="submit">
          <template v-for="(prop, index) in props">
            <v-switch
              v-if="EntityPropInfo[prop].type == 'bool'"
              :key="index"
              v-model="values[prop]"
              :label="`${EntityPropInfo[prop].label}: ${$options.filters.boolyn(values[prop])}`"
              @keydown.esc="$emit('update:show', false)"
            />
            <v-text-field
              v-else-if="EntityPropInfo[prop].type == 'number'"
              :key="index"
              v-model="values[prop]"
              :label="EntityPropInfo[prop].label"
              type="number"
              :autofocus="index == 0"
              @keydown.esc="$emit('update:show', false)"
            />
            <v-autocomplete
              v-else-if="EntityPropInfo[prop].type == 'entity'"
              :key="index"
              v-model="values[prop]"
              :label="EntityPropInfo[prop].label"
              :items="entitiesOptions"
              :autofocus="index == 0"
              @keydown.esc="$emit('update:show', false)"
            />
            <v-text-field
              v-else
              :key="index"
              v-model="values[prop]"
              :label="EntityPropInfo[prop].label"
              :autofocus="index == 0"
              @keydown.esc="$emit('update:show', false)"
            />
          </template>
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
    }
  }
}
</script>
