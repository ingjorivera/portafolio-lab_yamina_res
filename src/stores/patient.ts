import { defineStore } from 'pinia'
import { useUiStore } from './ui'
import type { ExamenRes } from '@/types/resExams'
import type {  Paciente,Pacienteexamenes } from '@/types/resExam1'

export const usePatientStore = defineStore('patient', {
    state: () => ({
        patient: {} as Paciente,
        patients: [],
        patient_id: '',
        phone:'',
        pin:'',
        token:'',
        examenRes: {} as ExamenRes,
        pacienteExamenes: [] as Pacienteexamenes[]
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
            if(data.error){
              uiStore.loading = false
              uiStore.showNotification('Usuario no encontrado!')
              return false
            }
            else{
              this.phone = data.phone
              uiStore.loading = false
              return true
            }
          
        } catch (error) {
          uiStore.showNotification('Error al enviar el pin, intente mas tarde')
          console.log('error',error)
          return false
        }
      },
      async validatePIN(pin:string) {
        
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
            uiStore.showNotification('Pin no valido, intente nuevamente o solicite uno nuevo')
            return false
          }
          else{
            this.pacienteExamenes=data[0].paciente_examenes
            this.patient=data[0].paciente
            this.token = data[0].token
            uiStore.loading = false
            return true
          }
  
          
         
        } catch (error) {
          uiStore.showNotification('Error al validar el pin, intente mas tarde')
          console.log(error)
          return false
        }
      },
      async downloadFile(code:string) {
        
        const uiStore = useUiStore()
        uiStore.loading = true
  
        try {
          fetch(`https://n8n-ioc8gg0g4c8kk0sckgcckccs.resultadosyaminacumplido.com/webhook/58d79f60-287c-41ba-8cfe-cc05202c75a0`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${this.token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({code})
          }).then(response => response.blob())
  
          //const data = await response.
        } catch (error) {
          console.log(error)
          uiStore.showNotification('Error al descargar el archivo, pongase en contacto con servicio al cliente del Laboratorio Especializado Yamina Cumplido')
          uiStore.loading = false
          return false
        }
      }
    }
})