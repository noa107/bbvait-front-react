import { Component } from 'react'
import { Card } from 'primereact/card'
import T from '../context/language/LanguageConsumer'
export class Home extends Component {
  render() {
    return <Card className="principalBackground">
     
     <h1>Primeros pasos con la aplicación</h1>
     <ul>
       <li>
         <span>La página se divide en:</span><br/><br/>
         <ul>
           <li><strong>Cabecera:</strong>Contiene el logotipo de la aplicación, la posibilidad de pulsando el icono <i class="fa fa-angle-left"></i> , de ocultar el menu, y a la derecha del todo muestra un icono que mientras que no se ha recibido respuesta a la petición estará dando vueltas y con otro color para indicar que todavía no se ha cargado la información.</li>
           <br/><li><strong>Menu izquierdo:</strong><br/>
           <br/><ul>
               <li><strong>Mi Perfil</strong>, donde se puede Visualizar datos de contacto</li>
               <li><strong>Adm. ciudades favoritas:</strong> donde el usuario puede crear, editar, consultar y borrar ciudades que quiera tener como favoritas. Esta gestión se realiza consultando a un backend que almacena las ciudades en bd</li>
               <li><strong>El Tiempo:</strong> Cuando se pulsa desde el menu izq por primera vez, carga por defecto el clima para la ciudad de Madrid, este componente es el mismo al que se redirige desde el pie de la aplicación, por lo que siempre que lo pulsemos desde el menu izq salvo la primera vez guardar la última consulta realizada </li>
               <li><strong>El tiempo en mis ciudades:</strong> Teniendo en cuenta las ciudades guardadas como favoritas, se encarga de consultar el clima para cada una de ellas mostrandolo en dos formatos, uno en forma de listado, y otro en forma de tarjeta mas reducido</li>
              </ul>
           </li>
           <br/><li><strong>Contenedor Principal :</strong> Donde se cargará la información según la acción ejecutada</li>
           <br/> <li><strong>Pie:</strong> Se muestra siempre, permite al usuario hacer una consulta del clima directa para una ciudad</li>
        </ul>
      </li>
      <br/> <li>La aplicación está preparada para adoptar diferentes configuraciones de visualización, por falta de tiempo se ha dejado una configuración de manera estática, que es la que se visualiza con el menu a la izq, perfil en el menu, etc. Esto se puede hacer almacenando esas variables en el localstorage de manera que el usuario pueda configurarlas en una pantalla y dejar guardads su preferencias de visualización de la aplicación</li>
     </ul>
    </Card>
  }
}
