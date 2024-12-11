<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePatientStore } from '@/stores/patient'


const patientStore = usePatientStore()
const tab = ref('ready')
const expandedGroups = ref(new Set())

const toggleGroup = (index: number) => {
    if (expandedGroups.value.has(index)) {
        expandedGroups.value.delete(index)
    } else {
        expandedGroups.value.add(index)
    }
}

const firstName = computed(() => {
    if (!patientStore.examenRes?.paciente?.length) return 'Usuario'

    let pos = 0
    if (patientStore.examenRes.paciente.length > 1) {
        pos = 1
    }

    const fullName = patientStore.examenRes.paciente[pos]?.nom1 || ''
    const firstWord = fullName.split(' ')[0].toLowerCase()
    return firstWord.charAt(0).toUpperCase() + firstWord.slice(1)
})

const limitedExams = computed(() => {
    if (!patientStore.examenRes?.paciente_examenes) return []

    return patientStore.examenRes.paciente_examenes
        .map((exam, index) => ({
            ...exam,
            examenes: {
                ...exam.examenes,
                validado: exam.examenes.validado ?
                    (expandedGroups.value.has(index) ? exam.examenes.validado : exam.examenes.validado.slice(0, 3)) :
                    []
            }
        }))
        .filter(exam => exam.examenes.validado && exam.examenes.validado.length > 0)
})

const pendingExams = computed(() => {
    if (!patientStore.examenRes?.paciente_examenes) return []

    return patientStore.examenRes.paciente_examenes
        .filter(exam => exam.examenes.pendiente && exam.examenes.pendiente.length > 0)
})

const getRemainingCount = (index: number) => {
    if (!patientStore.examenRes?.paciente_examenes) return 0

    const exam = patientStore.examenRes.paciente_examenes[index]
    if (!exam?.examenes?.validado) return 0

    return Math.max(0, exam.examenes.validado.length - 3)
}


</script>

<template>
    <div class="column full-height" style="gap: 14px;">
        <div class="text-h5 text-primary" style="font-weight: bold;">Hola {{ firstName }},</div>
        <div>Accede fácilmente a tus resultados de laboratorio. Aquí encontrarás tanto los pendientes como los que ya
            están listos para descargar.
        </div>

        <q-tabs v-model="tab" class="text-primary" inline-label>

            <q-tab icon="fas fa-check" name="ready" label="Disponibles" />
            <q-tab icon="fas fa-clock" name="pending" label="Pendientes" />
        </q-tabs>
        <div class="col bg-blue-grey-1" style="border-radius: 10px; border: 1px solid grey;">

            <q-tab-panels v-model="tab" animated class="bg-transparent">
                <q-tab-panel name="ready" style="height: 333px;">
                    <q-scroll-area class="fit custom-scroll" visible :vertical-offset="[8, 8]">
                        <div class="q-pa-md">
                            <template v-if="limitedExams.length > 0">
                                <q-card v-for="(examen, i) in limitedExams" :key="i" flat bordered
                                    class="q-mb-lg q-pa-sm" style="border-radius: 10px;">
                                    <div class="q-pa-sm column" style="gap:10px">
                                        <div class="row" style="font-size: x-small; gap:10px">
                                            <div class="row" style="gap:10px">
                                                <div>Fecha de generación: {{ examen.fecha_final }}</div>
                                                <div>Solicitud: #{{ examen.paciente_cod }}</div>
                                            </div>


                                        </div>

                                        <q-list bordered separator dense style="font-size: smaller;">
                                            <q-item v-for="(result, i) in examen.examenes.validado" :key="i">
                                                <q-item-section>
                                                    <q-item-label>{{ result.examenes.nombre }}</q-item-label>
                                                </q-item-section>
                                                <q-item-section side>
                                                    <q-chip dense
                                                        style="background-color: transparent; cursor: pointer;">
                                                        <span style="font-size: smaller; color: grey;">Validado

                                                        </span>

                                                        <q-icon name="fas fa-check-circle" class="q-ml-sm"
                                                            color="green" />
                                                    </q-chip>
                                                </q-item-section>
                                            </q-item>

                                        </q-list>

                                        <div class="row items-center justify-center q-gutter-sm">
                                            <q-btn v-if="!expandedGroups.has(i) && getRemainingCount(i) > 0"
                                                color="secondary"
                                                :label="'Ver ' + getRemainingCount(i) + ' exámenes más'"
                                                @click="toggleGroup(i)" flat class="q-mb-sm" />
                                            <q-btn color="primary" label="Descargar" style="width: 100%;"
                                                icon="fas fa-download"
                                                @click="patientStore.downloadFile(examen.paciente_cod)" />
                                        </div>
                                    </div>

                                </q-card>
                            </template>
                            <template v-else>
                                <div class="text-center q-pa-md">No hay exámenes disponibles</div>
                            </template>
                        </div>
                    </q-scroll-area>
                </q-tab-panel>
                <q-tab-panel name="pending" style="height: 333px;">
                    <q-scroll-area class="fit custom-scroll" visible :vertical-offset="[8, 8]">
                        <div class="q-pa-md">
                            <template v-if="pendingExams.length > 0">
                                <q-card v-for="(examen, i) in pendingExams" :key="i" flat bordered
                                    class="q-mb-lg q-pa-sm" style="border-radius: 10px;">
                                    <div class="q-pa-sm column" style="gap:10px">
                                        <div class="row" style="font-size: x-small; gap:10px">
                                            <div class="row" style="gap:10px">

                                                <div>Solicitud: #{{ examen.paciente_cod }}</div>
                                            </div>


                                        </div>

                                        <q-list bordered separator dense style="font-size: smaller;">
                                            <q-item v-for="(result, i) in examen.examenes.pendiente" :key="i">
                                                <q-item-section>
                                                    <q-item-label class="q-pt-sm ">{{ result.examenes.nombre
                                                        }}</q-item-label>
                                                    <q-item-label caption class="q-pb-sm">Fecha estimada: {{
                                                        result.fecha_prometida
                                                    }}</q-item-label>
                                                </q-item-section>
                                                <q-item-section side>
                                                    <q-chip dense
                                                        style="background-color: transparent; cursor: pointer;">
                                                        <span style="font-size: smaller; color: grey;">Pendiente

                                                        </span>
                                                        <q-tooltip>
                                                            Este resultado aun no ha sido validado.
                                                        </q-tooltip>
                                                        <q-icon name="fas fa-check-circle" class="q-ml-sm"
                                                            color="orange" />
                                                    </q-chip>
                                                </q-item-section>
                                            </q-item>

                                        </q-list>


                                    </div>

                                </q-card>
                            </template>
                            <template v-else>
                                <div class="text-center q-pa-md">No hay exámenes pendientes</div>
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
    background-color: #F9F8F8;
    border-bottom: 2px solid #EB9486;
}

.q-tab-panel {
    padding: 0 !important;
}
</style>