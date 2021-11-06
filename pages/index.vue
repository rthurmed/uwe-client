<template>
  <v-row>
    <v-col cols="12">
      <v-container>
        <!-- Project selector -->
        <v-system-bar color="transparent">
          <span>
            Projetos recentes
          </span>
          <span class="px-2">
            ·
          </span>
          <a href="#">
            Pesquisar projeto
          </a>
        </v-system-bar>
        <v-container class="d-flex justify-center">
          <AvatarCard
            v-for="i in 4"
            :key="i"
            :title="`PROJETO ${i}`"
            :highlight="i === selected"
            @click="() => selected = i"
          />
          <AvatarCard
            title="CRIAR PROJETO"
            @click="openCreatePopup"
          >
            <v-icon>
              mdi-plus
            </v-icon>
          </AvatarCard>
        </v-container>
      </v-container>
      <v-divider />
      <v-container>
        <v-system-bar color="transparent">
          <span>
            Projeto: PROJETO 1
          </span>
          <v-spacer />
          <a href="#">
            Deixar este projeto
          </a>
        </v-system-bar>
        <!-- Diagrams list -->
        <!-- Members list -->
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      selected: 1
    }
  },
  methods: {
    openCreatePopup: () => {}
  }
}
</script>
