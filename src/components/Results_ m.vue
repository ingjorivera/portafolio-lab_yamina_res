<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed } from "vue";
import { usePatientStore } from "@/stores/patient";

const patientStore = usePatientStore();
const tab = ref("ready");
const expandedGroups = ref(new Set());

const toggleGroup = (index: number) => {
  if (expandedGroups.value.has(index)) {
    expandedGroups.value.delete(index);
  } else {
    expandedGroups.value.add(index);
  }
};

const firstName = computed(() => {
  if (patientStore.patient.nom1 == "") return "Usuario";

  const fullName = patientStore.patient.nom1 || "";
  const firstWord = fullName.split(" ")[0].toLowerCase();

  return firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
});

const limitedExams = computed(() => {
  if (!patientStore.pacienteExamenes) return [];

  return patientStore.pacienteExamenes
    .map((exam, index) => ({
      ...exam,
      validados: expandedGroups.value.has(index)
        ? exam.validados
        : exam.validados.slice(0, 2),
    }))
    .filter((exam) => exam.validados && exam.validados.length > 0);
});
console.log(limitedExams);

const pendingExams = computed(() => {
  if (!patientStore.pacienteExamenes) return [];

  return patientStore.pacienteExamenes.filter(
    (exam) => exam.pendientes && exam.pendientes.length > 0
  );
});

const showMoreButton = computed(() => {
  return (index: number) => {
    const exam = patientStore.pacienteExamenes[index];
    return exam?.validados && exam.validados.length > 2;
  };
});
</script>

<template>
  <div class="column" style="gap: 14px; height: calc(100vh - 100px)">
    <div class="text-h5 text-primary" style="font-weight: bold">
      Hola {{ firstName }},
    </div>
    <div>
      Accede fácilmente a tus resultados de laboratorio. Aquí encontrarás tanto
      los pendientes como los que ya están listos para descargar.
    </div>

    <q-tabs v-model="tab" class="text-primary" inline-label>
      <q-tab icon="fas fa-check" name="ready" label="Disponibles" />
      <q-tab icon="fas fa-clock" name="pending" label="Pendientes" />
    </q-tabs>
    <div
      class="col bg-blue-grey-1"
      style="border-radius: 10px; border: 1px solid grey"
    >
      <q-tab-panels v-model="tab" animated class="bg-transparent">
        <q-tab-panel name="ready" style="height: calc(100vh - 290px)">
          <q-scroll-area
            class="fit custom-scroll"
            visible
            :vertical-offset="[8, 8]"
          >
            <div class="q-pa-md">
              <template v-if="limitedExams.length > 0">
                <q-card
                  v-for="(examen, i) in limitedExams"
                  :key="i"
                  flat
                  bordered
                  class="q-mb-lg q-pa-sm"
                  style="border-radius: 10px"
                >
                  <div class="q-pa-sm column" style="gap: 10px">
                    <div class="row" style="font-size: x-small; gap: 10px">
                      <div class="row" style="gap: 10px">
                        <div class="row">
                          <div class="text-blue-grey-5 q-pr-xs">
                            Fecha de generación:
                          </div>
                          {{ examen.fec_val }}
                        </div>
                        <div class="row">
                          <div class="text-blue-grey-5 q-pr-xs">
                            Solicitud: #
                          </div>
                          {{ examen.paciente_cod }}
                        </div>
                      </div>
                    </div>

                    <q-list bordered separator dense style="font-size: smaller">
                      <q-item v-for="(result, j) in examen.validados" :key="j">
                        <q-item-section>
                          <q-item-label class="grey-7">{{
                            result
                          }}</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                          <q-chip
                            dense
                            style="
                              background-color: transparent;
                              cursor: pointer;
                            "
                          >
                            <span style="font-size: smaller; color: grey"
                              >Validado</span
                            >
                            <q-icon
                              name="fas fa-check-circle"
                              class="q-ml-sm"
                              color="green"
                            />
                          </q-chip>
                        </q-item-section>
                      </q-item>
                    </q-list>

                    <div v-if="showMoreButton(i)" class="text-center">
                      <q-btn
                        flat
                        color="primary"
                        :label="expandedGroups.has(i) ? 'Ver menos' : 'Ver más'"
                        @click="toggleGroup(i)"
                        dense
                        no-caps
                        rounded
                        style="
                          background-color: #e8f3fa;
                          padding-left: 10px;
                          padding-right: 10px;
                        "
                        size="sm"
                      />
                    </div>
                    <div class="row items-center justify-center q-gutter-sm">
                      <q-btn
                        color="primary"
                        label="Descargar resultado"
                        style="width: 100%"
                        icon="fas fa-download"
                        @click="patientStore.downloadFile(examen.paciente_cod)"
                      />
                    </div>
                  </div>
                </q-card>
              </template>
              <template v-else>
                <div class="text-center q-pa-md">
                  No hay exámenes disponibles
                </div>
              </template>
            </div>
          </q-scroll-area>
        </q-tab-panel>
        <q-tab-panel name="pending" style="height: 333px">
          <q-scroll-area
            class="fit custom-scroll"
            visible
            :vertical-offset="[8, 8]"
          >
            <div class="q-pa-md">
              <template v-if="pendingExams.length > 0">
                <q-card
                  v-for="(examen, i) in pendingExams"
                  :key="i"
                  flat
                  bordered
                  class="q-mb-lg q-pa-sm"
                  style="border-radius: 10px"
                >
                  <div class="q-pa-sm column" style="gap: 10px">
                    <div class="row" style="font-size: x-small; gap: 10px">
                      <div class="row" style="gap: 10px">
                        <div>
                          Fecha de solicitud: {{ examen.fecha_recepcion }}
                        </div>
                        <div>Solicitud: #{{ examen.paciente_cod }}</div>
                      </div>
                    </div>

                    <q-list bordered separator dense style="font-size: smaller">
                      <q-item v-for="(result, j) in examen.pendientes" :key="j">
                        <q-item-section>
                          <q-item-label class="grey-7">{{
                            result
                          }}</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                          <q-chip
                            dense
                            style="
                              background-color: transparent;
                              cursor: pointer;
                            "
                          >
                            <span style="font-size: smaller; color: grey"
                              >Pendiente</span
                            >
                            <q-tooltip>
                              Este resultado aun no ha sido validado.
                            </q-tooltip>
                            <q-icon
                              name="fas fa-clock"
                              class="q-ml-sm"
                              color="orange"
                            />
                          </q-chip>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                </q-card>
              </template>
              <template v-else>
                <div class="text-center q-pa-md">
                  No hay exámenes pendientes
                </div>
              </template>
            </div>
          </q-scroll-area>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<style scoped>
.custom-scroll :deep(.q-scrollarea__thumb) {
  width: 4px;
  background: #b5b5b5;
  opacity: 0.7;
  z-index: 10;
  margin-right: 5px;
}

table {
  border-collapse: separate;
  border-spacing: 0;
  position: relative;
}

th {
  position: sticky;
  top: 0;
  background-color: #f9f8f8;
  border-bottom: 2px solid #eb9486;
}

.q-tab-panel {
  padding: 0 !important;
}
</style>
