import { Doctor } from './Doctor';

export class Cirujano extends Doctor {
  mostarDatos() {
    console.log(
      `Cirujano. Nombre: ${this.nombre}, Especialidad: ${this.especialidad}, Experiencia: ${this.experience}`
    );
  }

  operacionesRealizadas() {
    console.log(
      `Operaciones realizadas del cirujano ${this.nombre} (${this.pacienes.length})`
    );
    this.pacienes.forEach(({ nombre }) => {
      console.log(nombre);
    });
  }
}
