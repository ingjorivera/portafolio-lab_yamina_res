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
    },
    {
        id: 2,
        date: '2023-11-27',
        type: 'Glucosa',
        status: 'ready'
    },
    {
        id: 2,
        date: '2023-11-27',
        type: 'Glucosa',
        status: 'ready'
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
    <div class="column full-height" style="gap: 14px;">
        <div class="text-h5 text-primary" style="font-weight: bold;">Hola, Jorge</div>
        <div>Aqui encontraras los resultados pendientes y los que ya estan listos para
            descargar
        </div>

        <q-tabs v-model="tab" class="text-primary" inline-label>
            <q-tab icon="fas fa-clock" name="pending" label="Pendientes" />
            <q-tab icon="fas fa-check" name="ready" label="Listos" />
        </q-tabs>
        <div class="col bg-blue-grey-1" style="border-radius: 10px; border: 1px solid grey;">

            <q-tab-panels v-model="tab" animated class="bg-transparent">

                <q-tab-panel name="pending" style="height: 355px;">
                    <q-scroll-area class="fit custom-scroll" visible :vertical-offset="[8, 8]">
                        <div class="q-pa-sm"></div>
                        <div class="column q-pl-md q-pr-md " style="gap: 10px; "
                            v-for="month in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]" :key="month">

                            <q-card v-for="result in results.filter(r => r.status === 'pending')" :key="result.id" flat
                                bordered class="q-mb-lg">
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
                    </q-scroll-area>
                </q-tab-panel>

                <q-tab-panel name="ready" style="height: 355px;">
                    <q-scroll-area class="fit custom-scroll" visible :vertical-offset="[8, 8]">
                        <div class="column q-pl-md q-pr-md" style="gap: 10px; position: relative;">

                            <div class="bg-blue-grey-1 q-pt-md q-pb-md "
                                style="font-weight: bolder; z-index: 9; color: grey; border-bottom: 1px solid grey; font-size: medium; position: sticky !important; top: 0;">
                                Julio</div>
                            <div class="column ">
                                <q-card flat bordered class="q-mb-lg">
                                    <q-card-section>
                                        <div class="row items-center justify-between">
                                            <div class="column">
                                                <div class="text-subtitle1">texto</div>
                                                <div class="text-caption">Fecha: 10-01-24</div>
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
                                <q-card flat bordered class="q-mb-lg">
                                    <q-card-section>
                                        <div class="row items-center justify-between">
                                            <div class="column">
                                                <div class="text-subtitle1">texto</div>
                                                <div class="text-caption">Fecha: 10-01-24</div>
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
                                <q-card flat bordered class="q-mb-lg">
                                    <q-card-section>
                                        <div class="row items-center justify-between">
                                            <div class="column">
                                                <div class="text-subtitle1">texto</div>
                                                <div class="text-caption">Fecha: 10-01-24</div>
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
                                <q-card flat bordered class="q-mb-lg">
                                    <q-card-section>
                                        <div class="row items-center justify-between">
                                            <div class="column">
                                                <div class="text-subtitle1">texto</div>
                                                <div class="text-caption">Fecha: 10-01-24</div>
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
                            <div class="bg-blue-grey-1 q-pt-md q-pb-md "
                                style="font-weight: bolder; z-index: 9; color: grey; border-bottom: 1px solid grey; font-size: medium; position: sticky !important; top: 0;">
                                Agosto</div>
                            <div class="column ">
                                <q-card flat bordered class="q-mb-lg">
                                    <q-card-section>
                                        <div class="row items-center justify-between">
                                            <div class="column">
                                                <div class="text-subtitle1">texto</div>
                                                <div class="text-caption">Fecha: 10-01-24</div>
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
                                <q-card flat bordered class="q-mb-lg">
                                    <q-card-section>
                                        <div class="row items-center justify-between">
                                            <div class="column">
                                                <div class="text-subtitle1">texto</div>
                                                <div class="text-caption">Fecha: 10-01-24</div>
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
                                <q-card flat bordered class="q-mb-lg">
                                    <q-card-section>
                                        <div class="row items-center justify-between">
                                            <div class="column">
                                                <div class="text-subtitle1">texto</div>
                                                <div class="text-caption">Fecha: 10-01-24</div>
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
                                <q-card flat bordered class="q-mb-lg">
                                    <q-card-section>
                                        <div class="row items-center justify-between">
                                            <div class="column">
                                                <div class="text-subtitle1">texto</div>
                                                <div class="text-caption">Fecha: 10-01-24</div>
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
                            <div class="bg-blue-grey-1 q-pt-md q-pb-md "
                                style="font-weight: bolder; z-index: 9; color: grey; border-bottom: 1px solid grey; font-size: medium; position: sticky !important; top: 0;">
                                Septiembre</div>
                            <div class="column ">
                                <q-card flat bordered class="q-mb-lg">
                                    <q-card-section>
                                        <div class="row items-center justify-between">
                                            <div class="column">
                                                <div class="text-subtitle1">texto</div>
                                                <div class="text-caption">Fecha: 10-01-24</div>
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
                                <q-card flat bordered class="q-mb-lg">
                                    <q-card-section>
                                        <div class="row items-center justify-between">
                                            <div class="column">
                                                <div class="text-subtitle1">texto</div>
                                                <div class="text-caption">Fecha: 10-01-24</div>
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
                                <q-card flat bordered class="q-mb-lg">
                                    <q-card-section>
                                        <div class="row items-center justify-between">
                                            <div class="column">
                                                <div class="text-subtitle1">texto</div>
                                                <div class="text-caption">Fecha: 10-01-24</div>
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
                                <q-card flat bordered class="q-mb-lg">
                                    <q-card-section>
                                        <div class="row items-center justify-between">
                                            <div class="column">
                                                <div class="text-subtitle1">texto</div>
                                                <div class="text-caption">Fecha: 10-01-24</div>
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