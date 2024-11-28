<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')
const accept = ref(false)

</script>

<template>
  <div class="column"
    style="width: 100vw; height: 100vh; background: linear-gradient(rgba(255,255,255,0.55), rgba(255,255,255,0.55)), url('./images/bg_web-min.png'); background-size: cover;">

    <div class="col items-center justify-center row">
      <div class="bg-white row shadow-6" style="border-radius: 20px; overflow: hidden;">
        <div class="q-pa-md" style="width: 370px; background: url('./images/bg_left-min.png'); min-height: 470px;">
        </div>
        <div class="q-pa-lg bg-white column items-center " style="width: 620px;  gap:30px">
          <div class="text-h5 text-bold" style="text-align: center;">Resultados precisos y confiables <br> a un clic de
            distancia
          </div>
          <div class="" style="max-width:75% ; text-align: center;">

            Bienvenido al portal de resultados del Laboratorio Especializado Yamina Cumplido, aquí podras descargar tus
            resultados de forma sencilla, rapida y segura....

          </div>
          <div class="column bg-blue-grey-1 q-pa-md" style="border-radius: 10px; min-width: 420px; gap:12px">
            <div class="column" style="gap:8px">
              <div></div>
              <div style="text-align: center;">Ingrese su numero de identificacion</div>
              <q-input filled bg-color="white" dense v-model="text" label="Identificacion" />
              <q-checkbox dense v-model="accept" label="Acepto los terminos y condiciones" />
            </div>
            <q-btn label="Enviar pin de acceso" color="primary" class="full-width" style="margin-top: 20px;" />

          </div>

        </div>
      </div>
    </div>
    <div class="row justify-center" style="height: 50px;">
      Todos los derechos reservados
    </div>
  </div>
</template>

<style scoped></style>
