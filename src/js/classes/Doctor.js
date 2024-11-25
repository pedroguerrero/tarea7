export class Doctor {
  constructor(nombre, especialidad, experiencia) {
    this.nombre = nombre;
    this.especialidad = especialidad;
    this.experiencia = experiencia;
    this.pacienes = [];
  }

  mostarDatos() {
    console.log(
      `Dr. Nombre: ${this.nombre}, Especialidad: ${this.especialidad}, Experiencia: ${this.experiencia}`
    );
  }

  agregarPaciente(paciente) {
    this.pacienes.push(paciente);
  }

  mostrarPacientes() {
    console.log(`Pacientes del doctor ${this.nombre}`);
    this.pacienes.forEach(({ nombre }) => {
      console.log(nombre);
    });
  }

  getExperiencia() {
    return this.experiencia;
  }

  setExperiencia(experience) {
    this.experiencia = experience;
  }
}
