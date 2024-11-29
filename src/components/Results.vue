<script setup lang="ts">
import { ref } from 'vue'

const tab = ref('pending')
const results = ref([
  {
    id: 1,
    date: '2023-11-28',
    type: 'Hemograma',
    status: 'pending'
  },
  {
    id: 2,
    date: '2023-11-27',
    type: 'Glucosa',
    status: 'ready'
  }
])
</script>

<template>
  <div class="column q-pa-md full-height" style="gap: 20px;">
    <div class="text-h6">Mis Resultados</div>

    <q-tabs v-model="tab" class="text-primary">
      <q-tab name="pending" label="Pendientes" />
      <q-tab name="ready" label="Listos" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated class="bg-white">
      <q-tab-panel name="pending">
        <div class="column" style="gap: 10px;">
          <q-card v-for="result in results.filter(r => r.status === 'pending')" :key="result.id" flat bordered>
            <q-card-section>
              <div class="row items-center justify-between">
                <div class="column">
                  <div class="text-subtitle1">{{ result.type }}</div>
                  <div class="text-caption">Fecha: {{ result.date }}</div>
                </div>
                <q-chip color="orange" text-color="white" icon="pending">
                  Pendiente
                </q-chip>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-tab-panel>

      <q-tab-panel name="ready">
        <div class="column" style="gap: 10px;">
          <q-card v-for="result in results.filter(r => r.status === 'ready')" :key="result.id" flat bordered>
            <q-card-section>
              <div class="row items-center justify-between">
                <div class="column">
                  <div class="text-subtitle1">{{ result.type }}</div>
                  <div class="text-caption">Fecha: {{ result.date }}</div>
                </div>
                <div class="row items-center" style="gap: 10px;">
                  <q-chip color="positive" text-color="white" icon="check_circle">
                    Listo
                  </q-chip>
                  <q-btn flat round color="primary" icon="download" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<style scoped>
.q-tab-panels {
  background: transparent !important;
}
</style>