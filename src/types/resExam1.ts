export interface PacienteExamenes {
  paciente: Paciente;
  paciente_examenes: Pacienteexamenes[];
  token: string;
}

export interface Pacienteexamenes {
  paciente_cod: string;
  fecha_recepcion: string;
  fecha_prometida: string;
  fec_val: string;
  validados: string[];
  pendientes: string[];
}

export interface Paciente {
  celular: string;
  telefono: string;
  nom1: string;
  nit: string;
  activo: boolean;
  ciudad_cod: string;
  fecha: string;
  paciente_cod: string;
  email: string;
}