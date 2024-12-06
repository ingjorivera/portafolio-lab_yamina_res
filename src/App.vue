<script setup lang="ts">
import { ref } from 'vue'
import OtpInput from './components/OtpInput.vue'
import Results from './components/Results.vue';
import { usePatientStore } from './stores/patient';
import { useUiStore } from './stores/ui';

const patientStore = usePatientStore()
const uiStore = useUiStore()

const identification_number = ref('')
const accept = ref(false)
const otpCode = ref('')
const slide = ref('identification')
const principal = ref('login')
const timer = ref(30)
const canResendPin = ref(false)

const numberRule = (val: string) => {
  if (!val) return 'Este campo es requerido'
  return /^\d+$/.test(val) || 'Solo se permiten números'
}

const handleSendPin = () => {
  patientStore.getPIN(identification_number.value).then(() => {
    slide.value = 'verification'
    startTimer()
  })
}

const startTimer = () => {
  timer.value = 30
  canResendPin.value = false
  const interval = setInterval(() => {
    timer.value--
    if (timer.value === 0) {
      clearInterval(interval)
      canResendPin.value = true
    }
  }, 1000)
}

const resendPin = () => {
  if (canResendPin.value) {
    handleSendPin()
  }
}

const handleVerifyPin = () => {
  patientStore.validatePIN(otpCode.value).then((data) => {
    console.log(data)
    if (data) {
      principal.value = 'results'
    }
    else {
      console.log('error en el pin')
    }

  })

}
</script>

<template>
  <div class="column"
    style="width: 100vw; height: 100vh; background: linear-gradient(rgba(255,255,255,0.55), rgba(255,255,255,0.55)), url('./images/bg_web-min.png'); background-size: cover;">

    <div class="col items-center justify-center row">
      <div class="bg-white row shadow-6" style="border-radius: 20px; overflow: hidden;">
        <div class="q-pa-md row items-end justify-center q-pb-xl"
          style="width: 370px; background: url('./images/bg_lateral.png'); min-height: 470px; background-size: cover;">
          <img src="/images/logo_yamina.svg" alt="">
        </div>
        <div class="q-pa-lg bg-white column items-center " style="width: 600px;  ">
          <q-carousel animated v-model="principal" transition-prev="slide-right" transition-next="slide-left" no-swipe
            style="width: 100%; height: fit-content;">
            <q-carousel-slide name="login">
              <div class="column q-pa-md items-center" style="gap:30px">
                <div class="text-h5 text-bold text-primary" style="text-align: center;">Resultados precisos y confiables
                  <br> a un
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
                    v-model="slide" animated style="height: fit-content;" no-swipe>
                    <q-carousel-slide name="identification">
                      <div class="column" style="gap:12px">
                        <div class="column" style="gap:8px">

                          <div style="text-align: center;">Ingrese su número de identificacion</div>
                          <q-input filled bg-color="white" dense class="[&::-webkit-inner-spin-button]:appearance-none"
                            v-model="identification_number" label="Identificacion" maxlength="10" :rules="[numberRule]"
                            @keypress="(e: KeyboardEvent) => {
                              if (!/\d/.test(e.key)) {
                                e.preventDefault()
                              }
                            }" />
                          <q-checkbox dense v-model="accept" label="Acepto los terminos y condiciones" />
                        </div>
                        <q-btn :loading="uiStore.loading"
                          :disabled="identification_number.length < 7 || accept == false" @click="handleSendPin"
                          label="Enviar pin de acceso" color="accent" class="full-width" style="margin-top: 20px;">
                          <template v-slot:loading>
                            <q-spinner />
                          </template>
                        </q-btn>
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
                              Si no recibio su PIN, puede solicitarlo nuevamente<br>
                              <span v-if="!canResendPin">en {{ timer }} segundos.</span>
                              <q-btn v-else flat dense color="primary" label="Reenviar PIN" @click="resendPin" />
                            </div>
                          </div>

                        </div>
                        <q-btn :loading="uiStore.loading" label="Verificar código" color="accent" class="full-width"
                          style="margin-top: 20px;" @click="handleVerifyPin">
                          <template v-slot:loading>
                            <q-spinner />
                          </template>
                        </q-btn>
                      </div>
                    </q-carousel-slide>

                  </q-carousel>


                </div>

              </div>
            </q-carousel-slide>
            <q-carousel-slide name="results">
              <div style=" height: 500px;">
                <Results />
              </div>

            </q-carousel-slide>
          </q-carousel>


        </div>
      </div>
    </div>
    <div class="row justify-center footer_color" style="height: 50px; gap:20px; ">

      <div class="pointer"> 2020-2024, Laboratorio Especializado Yamina Cumplido</div>
      <div>Sincelejo - Colombia</div>
      <div class="pointer">Términos y condiciones</div>
      <div class="pointer">Redes sociales</div>
    </div>
  </div>
</template>

<style scoped>
.footer_color {
  color: rgba(18, 7, 138, 0.578);

}

.pointer {
  cursor: pointer;
}

/* Hide number input spinners */
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}
</style>
