export interface ExamenRes {
  paciente: Paciente[];
  paciente_examenes: Pacienteexamenes[];
}

export interface Pacienteexamenes {
  paciente_cod: string;
  fecha_final: string;
  examenes: ExamenesDet;
}

export interface ExamenesDet {
  validado: Status[];
  pendiente: Status[];
}

export interface Status {
  fec_val: null;
  contestado: boolean;
  fecha_recepcion: string;
  examenes: Examen;
}

export interface Examen {
  nombre: string;
}

export interface Paciente {
  nit: string;
  telefono: string;
  nom1: string;
}