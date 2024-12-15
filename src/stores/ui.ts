import { defineStore } from "pinia";
import { useQuasar } from 'quasar'


export const useUiStore = defineStore("ui", {
    state: () => ({
        loading: false,
        $q: useQuasar()
    }),
    actions: {
       showNotification(message:string) {

        this.$q.notify({
          message: message,
          color: "error",
          icon: "error",
          position: "center",
        });
      },
    },
});