
import { defineStore } from 'pinia'
import { useUiStore } from './ui'



export const usePatientStore = defineStore('patient', {
    state: () => ({
        patient: {},
        patients: [],
        patient_id: '',
        phone:'',
        pin:'',
        token:'',
        examenRes:{}
    }),
    actions: {


      async getPIN(id: string) {
        const uiStore = useUiStore()
        uiStore.loading = true
        this.patient_id=id
  
        try {
          const response = await fetch(`https://n8n-ioc8gg0g4c8kk0sckgcckccs.resultadosyaminacumplido.com/webhook/2755cc81-5d0f-4852-931c-921309c5d5c7`, {
            method: 'POST',
            headers: {
             
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({'id':id}),
          })
  
  
          const data = await response.json()
  
          if (!response.ok) throw new Error('Error fetching in pin send')
  
          this.phone = data.phone
          uiStore.loading = false
          return true
        } catch (error) {
          console.log(error)
          return false
        }
      },
      async validatePIN(pin:string) {
        this.examenRes={}
        const uiStore = useUiStore()
        uiStore.loading = true
  
        try {
          const response = await fetch(`https://n8n-ioc8gg0g4c8kk0sckgcckccs.resultadosyaminacumplido.com/webhook/556af0dd-5193-4fe4-b8cb-913f2a8e8978`, {
            method: 'POST',
            headers: {
             
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({'phone':this.phone,'pin':pin,'id':this.patient_id}),
          })
  
  
          const data = await response.json()
        

          console.log(data)
          if(data.error){
            uiStore.loading = false
            return false
          }
          else{
            this.examenRes=data
            this.token = data[0].token
            uiStore.loading = false
            return true
          }
  
          
         
        } catch (error) {
          console.log(error)
          return false
        }
      }

        
        
    },
   
})