<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  length?: number;
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const otpValues = ref(Array(props.length || 4).fill(""));
const inputRefs = ref<HTMLInputElement[]>([]);

const setInputRef = (el: any, index: number) => {
  if (el) {
    const input =
      el.$el?.querySelector("input") ||
      el.$el?.getElementsByClassName("q-field__native")[0];
    if (input) {
      inputRefs.value[index] = input;
    }
  }
};

const updateModelValue = () => {
  emit("update:modelValue", otpValues.value.join(""));
};

const handleKeyup = (index: number, event: KeyboardEvent) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;

  // Solo permitir números
  if (!/^\d*$/.test(value)) {
    otpValues.value[index] = "";
    return;
  }

  // Actualizar valor
  otpValues.value[index] = value.slice(-1);
  updateModelValue();

  // Mover al siguiente input si hay un valor
  if (value && index < (props.length || 4) - 1 && inputRefs.value[index + 1]) {
    inputRefs.value[index + 1].focus();
  }
};

const handleKeydown = (index: number, event: KeyboardEvent) => {
  if (event.key === "Backspace") {
    if (!otpValues.value[index] && index > 0 && inputRefs.value[index - 1]) {
      // Si el input actual está vacío, borrar el anterior y mover el focus
      event.preventDefault();
      otpValues.value[index - 1] = "";
      inputRefs.value[index - 1].focus();
      updateModelValue();
    }
  }
};

watch(
  () => props.modelValue,
  (newValue) => {
    if (!newValue) {
      otpValues.value = Array(props.length || 4).fill("");
    }
  }
);
</script>

<template>
  <div class="row q-gutter-sm justify-center">
    <q-input
      v-for="(digit, index) in otpValues"
      :key="index"
      v-model="otpValues[index]"
      :ref="(el) => setInputRef(el, index)"
      type="text"
      inputmode="numeric"
      pattern="[0-9]*"
      maxlength="1"
      class="otp-input"
      :placeholder="index + 1"
      :rules="[(val) => /^\d*$/.test(val) || 'Solo números']"
      @keyup="handleKeyup(index, $event)"
      @keydown="handleKeydown(index, $event)"
      style="width: 50px; flex-wrap: nowrap !important"
    >
    </q-input>
  </div>
</template>

<style scoped>
.otp-input :deep(.q-field__native) {
  text-align: center;
  font-size: 25px;
  font-weight: bolder;
}

.otp-input :deep(.q-field__inner) {
  background-color: white;
  border-radius: 4px;
}
.otp-input :deep(.q-field__native::placeholder) {
  color: #bcbcbc;
}
</style>
