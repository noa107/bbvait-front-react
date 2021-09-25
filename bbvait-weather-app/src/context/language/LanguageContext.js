import React from "react";

export const translations = {
  en: {
    menu_option1: "Home",
    menu_option3: "Weather",
    menu_option2: "City Weather List",
    menu_option4: "The Weather in my cities",
    titleApp: "Weather App",
    titListCities:"List of cities defined to check the weather",
    crud_new: "New",  
    crud_deleteAll: "Delete all",
    crud_import: "Import",
    crud_export: "Export",
    labelFindWeather: "City to find",
    form_name:"Name",
    dialog_edit_title:"Edit City",
    dialog_edit_valNull:"The name is required",
    button_cancel:"Cancel",
    button_save:"Save",
    question_dialog_delete:"Are you sure you want to delete:",
    dialog_delete_title:"Confirm",
    button_yes:"Yes",
    mns_delete:"city Deleted",
    mns_create:"City Create",
    mns_update:"City Update",
    dialog_create_title:"Add City",
    mns_deleteAll:"Delete cities selected",
    question_dialog_deleteAll:"Are you sure you want to delete the selected cities?",
    findWeather:"Find",
    titPanelPie:"Time search for today",
    loadSearch:"Loading",
    loadPrevision:"Load next days"


  },
  es: {
    menu_option1: "Inicio",
    menu_option3: "El Tiempo",
    menu_option2: "Lista de Ciudades",
    menu_option4: "El tiempo en mis ciudades",
    titleApp: "Aplicación del tiempo",
    titListCities:"Listado de ciudades definidas para consultar el tiempo",
    crud_new: "Nuevo",   
    crud_deleteAll: "Eliminar todo",
    crud_import: "Importar",
    crud_export: "Exportar",
    labelFindWeather: "Ciudad a buscar",
    form_name:"Nombre",
    dialog_edit_title:"Editar Ciudad",
    dialog_edit_valNull:"El nombre es requerido",
    button_cancel:"Cancelar",
    button_save:"Guardar",
    question_dialog_delete:"¿Está seguro de eliminar esta ciudad:",
    dialog_delete_title:"Confirmar",
    button_yes:"Sí",
    mns_delete:"Se ha eliminado la ciudad",
    mns_create:"Se ha creado la ciudad",
    mns_update:"Se ha modificado la ciudad",
    mns_deleteAll:"Se han eliminado las ciudades seleccionadas",
    dialog_create_title:"Añadir Ciudad",
    question_dialog_deleteAll:"¿Está seguro de eliminar las ciudades seleccionadas?",
    findWeather:"Buscar",
    titPanelPie:"Busque el tiempo para hoy",
    loadSearch:"Intentando cargar la búsqueda",
    loadPrevision:"No se pueden cargar más días"
  },
};

export const LanguageContext = React.createContext();
