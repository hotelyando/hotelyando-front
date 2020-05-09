//lista de mensajes y etiquetas de aplicacion

export const messages = {
  //iconos para los mensajes
  success: 'success',
  error: 'error',
  warning: 'warning',
  //tamaño de la pantalla de mensajes
  widthWindowMessage: '300',
  // item crud
  editItemError: 'Error Actualizando el item',
  editItemSuccess: 'El item fue guardado exitosamente',
  itemColumnName: ' Nombre item ',
  itemColumnDescription: ' Descripción ',
  itemColumnQuantity: ' Cantidad ',
  itemColumnPrice: ' Precio ',

  //user crud
  editUserError: 'Error Actualizando el usuario',
  editUserSuccess: 'El usuario fue actualizado exitosamente',
  addUserError: 'Error Guardando el usuario',
  addUserSuccess: 'El usuario fue guardado exitosamente',

  //rooms crud

  // sale transaction

  //param crud
  //employee crud
  addEmployeeError: 'Error Guardando el empleado',
  addEmployeeSuccess: 'El empleado fue guardado exitosamente',
  //person crud
  editPersonError: 'Error Actualizando la persona',
  editPersonSuccess: 'La persona fue guardada exitosamente',
  addPersonError: 'Error Guardando la persona',
  addPErsonSuccess: 'El persona fue guardado exitosamente',
  deletePersonError: 'Error borrnando la persona',
  deletePersonSuccess: 'El persona fue borrada exitosamente',

  //tecnical error
  tecnicalError: 'Error tecnico, ingrese de nuevo o comuniquese con el administrador',
  emptydDataForm: 'Alguno de los datos esta vacio o no tiene el formato '
};

export class Messages {
  private static messages = {
    delete_confirm: '¿Estás seguro de eliminar el %0?',
    delete_success: 'El %0 fue eliminado exitosamente',
    delete_error: 'El %0  no fue eliminado exitosamente',
    insert_confirm: '¿Estás seguro de ingresar el %0?',
    insert_success: 'El %0 fue ingresado exitosamente',
    insert_error: 'Error al ingresar el %0 : %1',
    edit_confirm: '¿Estás seguro de actualizar el %0?',
    edit_success: 'El %0 fue actualizado exitosamente',
    edit_error: 'Error al actualizar el %0  %1',
    retrieve_error: ' Error al consultar los datos de %0',

    setEmailtoLogin: '¿Desea colocar el email %0 como usuario?',
    dataFormError: ' Falta diligenciar uno de los datos para %0 ',

    confirm_logout: 'Desea salir del sistema?',
    confirm_delete: 'Desea eleiminar el(la) %0?',

    priceDetail_info_incomplete:
      'Para definir un precio <b>personalizado</b>, debe definir por lo menos para que día aplicará y un precio por día u hora.',
    priceDetail_save_success: 'El tipo de habitación fue guardado exitosamente.',
    priceDetail_list_noContent: 'No se han definido tipos de habitación.',

    no_message: 'No existe mensaje con código %0'
  };

  static get(codigo: string, ...parametros: string[]): string {
    const message: string = this.messages[codigo];
    if (message) {
      return message.replace(/\%(\d+)/g, (match) => parametros[match.slice(1)] || match);
    } else {
      throw new Error(Messages.get('no_message', codigo));
    }
  }
}
