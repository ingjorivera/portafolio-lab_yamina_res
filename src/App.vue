<script setup lang="ts">
import { ref } from 'vue'
import OtpInput from './components/OtpInput.vue'
import Results from './components/Results.vue';

const text = ref('')
const accept = ref(false)
const otpCode = ref('')
const slide = ref('identification')
const principal = ref('login')

const handleSendPin = () => {

  slide.value = 'verification'

}
const handleVerifyPin = () => {
  principal.value = 'results'
}
</script>

<template>
  <div class="column"
    style="width: 100vw; height: 100vh; background: linear-gradient(rgba(255,255,255,0.55), rgba(255,255,255,0.55)), url('./images/bg_web-min.png'); background-size: cover;">

    <div class="col items-center justify-center row">
      <div class="bg-white row shadow-6" style="border-radius: 20px; overflow: hidden;">
        <div class="q-pa-md"
          style="width: 370px; background: url('./images/bg_left-min.png'); min-height: 470px; background-size: cover;">
        </div>
        <div class="q-pa-lg bg-white column items-center " style="width: 600px;  ">
          <q-carousel animated v-model="principal" transition-prev="slide-right" transition-next="slide-left"
            style="height: fit-content; width: 100%;">
            <q-carousel-slide name="login">
              <div class="column q-pa-md" style="gap:30px">
                <div class="text-h5 text-bold" style="text-align: center;">Resultados precisos y confiables <br> a un
                  clic de
                  distancia
                </div>
                <div class="" style="max-width:75% ; text-align: center;">

                  Bienvenido al portal de resultados del Laboratorio Especializado Yamina Cumplido, aquí podras
                  descargar tus
                  resultados de forma sencilla, rapida y segura.

                </div>
                <div class="column bg-blue-grey-1 q-pa-md" style="border-radius: 10px; min-width: 420px; ">
                  <q-carousel class="bg-transparent" transition-prev="slide-right" transition-next="slide-left"
                    v-model="slide" animated style="height: fit-content;">
                    <q-carousel-slide name="identification">
                      <div class="column" style="gap:12px">
                        <div class="column" style="gap:8px">

                          <div style="text-align: center;">Ingrese su número de identificacion</div>
                          <q-input filled bg-color="white" dense v-model="text" label="Identificacion" />
                          <q-checkbox dense v-model="accept" label="Acepto los terminos y condiciones" />
                        </div>
                        <q-btn @click="handleSendPin" label="Enviar pin de acceso" color="primary" class="full-width"
                          style="margin-top: 20px;" />
                      </div>

                    </q-carousel-slide>

                    <q-carousel-slide name="verification">
                      <div class="column" style="gap:12px">
                        <div class="column items-center" style="gap:20px">
                          <div style="text-align: center; font-size: medium; font-weight: bold">Ingrese el código
                            enviado a su
                            celular</div>
                          <div class="column">
                            <OtpInput v-model="otpCode" />
                            <div style="text-align: center; font-size: small;">
                              Si no recibio su PIN, puede solicitarlo nuevamente<br> dentro de 30 segundos.
                            </div>
                          </div>

                        </div>
                        <q-btn label="Verificar código" color="primary" class="full-width" style="margin-top: 20px;"
                          @click="handleVerifyPin" />
                      </div>
                    </q-carousel-slide>

                  </q-carousel>


                </div>

              </div>
            </q-carousel-slide>
            <q-carousel-slide name="results">
              <div style=" height: 400px;">
                <Results />
              </div>

            </q-carousel-slide>
          </q-carousel>


        </div>
      </div>
    </div>
    <div class="row justify-center" style="height: 50px;">
      Todos los derechos reservados
    </div>
  </div>
</template>

<style scoped></style>
