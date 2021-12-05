<template>
  <v-menu
    absolute
    :close-on-click="false"
    :close-on-content-click="false"
    :value="show"
    :position-x="x"
    :position-y="y"
  >
    <v-card min-width="230">
      <v-card-title>
        <span v-if="props.length === 1">
          {{ EntityPropInfo[props[0]].label }}
        </span>
        <span v-else>
          #{{ currentEntity.id }}
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
      <v-card-text>
        <v-form @submit.prevent="submit">
          <template v-for="(prop, index) in props">
            <v-switch
              v-if="EntityPropInfo[prop].type == 'bool'"
              :key="index"
              v-model="value"
              :label="`${EntityPropInfo[prop].label}: ${$options.filters.boolyn(value)}`"
            />
            <v-text-field
              v-else-if="EntityPropInfo[prop].type == 'number'"
              :key="index"
              v-model="value"
              :label="EntityPropInfo[prop].label"
              type="number"
            />
            <v-select
              v-else-if="EntityPropInfo[prop].type == 'entity'"
              :key="index"
              v-model="value"
              :items="entitiesOptions"
            />
            <v-text-field
              v-else
              :key="index"
              v-model="value"
              :label="EntityPropInfo[prop].label"
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
      value: 0
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
      return Entity
        .query()
        .where('diagramId', this.currentEntity.diagramId)
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
    prop: 'copyValue'
  },
  methods: {
    // Copies the value from the entity to the temporary variable
    copyValue () {
      if (this.currentEntity == null || !(this.prop in this.currentEntity)) {
        return
      }
      this.value = this.currentEntity[this.prop]
    },
    submit () {
      const entity = { ...Entity.find(this.entity) }
      entity[this.prop] = this.value
      this.$socket.emit('patch', entity)
      this.$emit('update:show', false)
    }
  }
}
</script>
