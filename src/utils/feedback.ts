export const FEEDBACK = {
  ERROR: {
    AUTH_DATA_INVALID: "Los datos enviados son incorrectos",
    CREDENTIALS_INVALID: "Las credenciales son incorrectas",
    UNAUTHORIZED: "No tienes permiso para acceder",
    INVALID_DATA: "Los datos enviados no son válidos",
    CATEGORY: {
      ALREADY_EXISTS: "La categoría ya existe",
      NOT_GET_CATEGORIES: "Error al obtener las categorías",
    },
    EXERCISE: {
      ALREADY_EXISTS: "El ejercicio ya existe en esta categoría",
      NOT_GET_EXERCISES: "Error al obtener los ejercicios",
      NOT_DELETED: "Error al eliminar el ejercicio",
      HAS_SESSIONS: "No se puede eliminar porque hay sesiones con este ejercicio",
    },
    SESSION: {
      NOT_CREATED: "Error al guardar la sesión",
      NOT_GET_SESSIONS: "Error al obtener las sesiones",
      NOT_DELETED: "Error al eliminar la sesión",
    },
  },
  SUCCESS: {
    CATEGORY: {
      CREATED: "Categoría creada correctamente",
      UPDATED: "Categoría actualizada correctamente",
      DELETED_ALL: "Todas las categorías eliminadas correctamente",
    },
    EXERCISE: {
      CREATED: "Ejercicio creado correctamente",
      UPDATED: "Ejercicio actualizado correctamente",
      DELETED: "Ejercicio eliminado correctamente",
    },
    SESSION: {
      CREATED: "Sesión guardada correctamente",
      UPDATED: "Sesión actualizada correctamente",
      DELETED: "Sesión eliminada correctamente",
    },
  },
};
