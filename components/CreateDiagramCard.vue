<template>
  <v-card
    v-bind="$attrs"
    v-on="$listeners"
  >
    <v-list subheader>
      <v-subheader class="justify-center">
        Importar diagrama
      </v-subheader>
      <v-list-item>
        <v-file-input
          solo
          disabled
          prepend-icon=""
          prepend-inner-icon="mdi-upload"
          placeholder=""
        >
          <template #append>
            <v-btn text>
              Enviar
            </v-btn>
          </template>
        </v-file-input>
      </v-list-item>
      <v-divider />
      <v-subheader class="justify-center">
        Criar novo diagrama
      </v-subheader>
      <v-list-item
        v-for="type in Object.values(DiagramType)"
        :key="type"
        @click="() => create(type)"
      >
        <v-list-item-icon>
          <v-icon>
            {{ DiagramTypeInfo[type].icon }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ DiagramTypeInfo[type].label }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { DiagramTypeInfo } from '~/classes/diagram/DiagramTypeInfo'
import { Diagram } from '~/models/diagram'
import { DiagramType } from '~/models/enum/diagram-type'

export default {
  props: {
    projectId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      DiagramType,
      DiagramTypeInfo
    }
  },
  methods: {
    create (type) {
      Diagram
        .api()
        .post(Diagram.entity, {
          type,
          name: 'Diagrama sem nome',
          projectId: this.projectId
        })
        .then(({ response }) => {
          this.$emit('response', response)
        })
    }
  }
}
</script>
