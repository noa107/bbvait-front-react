import { Component, Fragment } from 'react'
import { ServiceCities } from '../services/ServiceCities'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'
import { Column } from 'primereact/column'
import { Toast } from 'primereact/toast'
import { Toolbar } from 'primereact/toolbar'
import { classNames } from 'primereact/utils'
import { DataTable } from 'primereact/datatable'
import T from '../context/language/LanguageConsumer'
import './css/ListCities.css'


export class ListCities extends Component {
  emptyCity = {
    id: null,
    name: '',
    email: null,
  }
  constructor() {
    super()
    this.serviceCities = new ServiceCities()
    this.state = {
      cities: null,
      cityDialog: false,
      cityCreateDialog:false,
      deleteCityDialog: false,
      deleteCitiesDialog: false,
      city: this.emptyCity,
      selectedCities: null,
      submitted: false,
      globalFilter: null,
      idNext:0
    }
    //BORRA UNA CIUDAD
    this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this)
    //BORRA DE 1 A N CIUDADES
    this.deleteSelectedDialogs = this.deleteSelectedDialogs.bind(this)
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this)
    this.confirmDeleteCity = this.confirmDeleteCity.bind(this)
    this.hideDialog = this.hideDialog.bind(this)
    this.hideDialogCreate = this.hideDialogCreate.bind(this)
    this.hideDeleteCityDialog = this.hideDeleteCityDialog.bind(this)
    // PARA BORRAR UNA CIUDAD
    this.deleteCity = this.deleteCity.bind(this)
     /* PARA EDITAR UNA CIUDAD EXISTENTE */
    this.saveCity = this.saveCity.bind(this)
    this.editCity = this.editCity.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    /* PARA AÑADIR UNA CIUDAD */
    this.addCity = this.addCity.bind(this);
    this.openNew = this.openNew.bind(this)
    /* PARA LAS BOTONERAS DE LA CABECERA DE LA TABLA */
    this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
    this.exportCSV = this.exportCSV.bind(this);
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
    //BOTON BORRAR TODOS LOS SELECCIONADOS
    this.hideDeleteCitiesDialog = this.hideDeleteCitiesDialog.bind(this)
   
  }

  componentDidMount() {
   this.serviceCities.getCities().then((data) => {console.log(data)
     if(data !== "response without error"){
      let ordData = data.sort((a, b) => (a.id < b.id ? 1 : -1));    
      const idNext = (ordData!=null && ordData.length !==0) ? (ordData[0].id +1) : 1;    
      this.setState({ cities: data , idNext:idNext})
     }
    })
  }
  /* METODOS FUNCIONALIDAD */
  onInputChange(e, name) {
    const val = (e.target && e.target.value) || ''
    let city = { ...this.state.city }
    city[`${name}`] = val

    this.setState({ city })
  }
  exportCSV() {
    this.dt.exportCSV();
}
  openNew() {
    this.setState({
      city: this.emptyCity,
      submitted: false,
      cityCreateDialog: true,
    })
  }

  leftToolbarTemplate() {
    return (
      <Fragment>
        <Button
          label= {<T clave="crud_new" />}
          icon="pi pi-plus"
          className="p-button-secondary p-mr-2"
          onClick={this.openNew}
        />
        <Button
          label={<T clave="crud_deleteAll" />}
          icon="pi pi-trash"
          className="p-button-success"
          onClick={this.confirmDeleteSelected}
          disabled={
            !this.state.selectedCities || !this.state.selectedCities.length
          }
        />
      </Fragment>
    )
  }

  rightToolbarTemplate() {
    return (
      <Fragment>     
  
        <Button
          label={<T clave="crud_export" />}
          icon="pi pi-upload"
          className="p-button-primary"
          onClick={this.exportCSV}
        />
      </Fragment>
    )
  }

  confirmDeleteCity(city) {
    this.setState({
      city,
      deleteCityDialog: true,
    })
  }
  actionBodyTemplate(rowData) {
    return (
      <Fragment>
        <Button
          icon="pi pi-pencil"          
          className="p-button-rounded p-button-warning p-mr-2"
          onClick={() => this.editCity(rowData)}
        />
        <Button
          icon="pi pi-trash"          
          className="p-button-rounded p-button-success"
          onClick={() => this.confirmDeleteCity(rowData)}
        />
      </Fragment>
    )
  }
  editCity(city) {
    this.setState({
      city: { ...city },
      cityDialog: true,
    })
  }
  deleteCity() {
    let cities = this.state.cities.filter(
      (val) => val.id !== this.state.city.id,
    )   
    this.serviceCities.deleteCity(this.state.city.id).then((data) => {
      if (data.status !== 400 && data.status !== 403) {
        this.setState({ cities: cities })
        this.toast.show({
          severity: 'success',
          summary: 'Successful',
          detail: <T clave="mns_delete"/>,
          life: 3000,
        })
      }
    })
    this.setState({
      cities,
      deleteCityDialog: false,
      city: this.emptyCity,
    })
 
  }
  confirmDeleteSelected() {
    this.setState({ deleteCitiesDialog: true })
  }
  hideDialog() {
    this.setState({
      submitted: false,
      cityDialog: false,
    })
  }
  hideDialogCreate() {
    this.setState({
      submitted: false,
      cityCreateDialog: false,
    })
  }
  hideDeleteCityDialog() {
    this.setState({ deleteCityDialog: false })
  }

  hideDeleteCitiesDialog() {
    this.setState({ deleteCitiesDialog: false })
  }
  findIndexById(id) {
    let index = -1
    for (let i = 0; i < this.state.cities.length; i++) {
      if (this.state.cities[i].id === id) {
        index = i
        break
      }
    }

    return index
  }
  addCity(){
    
      let state = { submitted: true }
  
      if (this.state.city.name.trim()) {
        let cities = [...this.state.cities]
        let city = { ...this.state.city }
        
        if (this.state.city.id) {
          const index = this.findIndexById(this.state.city.id)
  
          cities[index] = city
        } else {
          city.id = this.state.idNext;
          cities.push(city)
        }
       this.serviceCities.addCity( city).then((data) => {
          if (data.status !== 400 && data.status !== 403) {
            this.setState({ cities: cities })
            this.toast.show({
              severity: 'success',
              summary: 'Successful',
              detail: <T clave="mns_create"/>,
              life: 3000,
            })
          }
        })
        state = {
          ...state,
          cities,
          cityCreateDialog: false,
          city: this.emptyCity,
        }
      }
  
      this.setState(state)
    }
    
  saveCity() {
    let state = { submitted: true }

    if (this.state.city.name.trim()) {
      let cities = [...this.state.cities]
      let city = { ...this.state.city }
      
      if (this.state.city.id) {
        const index = this.findIndexById(this.state.city.id)

        cities[index] = city
      } else {
        city.id = this.state.idNext;
        cities.push(city)
      }
     this.serviceCities.save(city.id, city).then((data) => {
        if (data.status !== 400 && data.status !== 403) {
          this.setState({ cities: cities })
          this.toast.show({
            severity: 'success',
            summary: 'Successful',
            detail: <T clave="mns_update"/>,
            life: 3000,
          })
        }
      })
      state = {
        ...state,
        cities,
        cityDialog: false,
        city: this.emptyCity,
      }
    }

    this.setState(state)
  }
  deleteSelectedDialogs() {
    let cities = this.state.cities.filter(
      (val) => !this.state.selectedCities.includes(val),
    )
    this.setState({
      cities,
      deleteCitiesDialog: false,
      selectedCities: null,
    })
    this.state.cities.filter(
      (val) => this.state.selectedCities.includes(val),
    ).forEach(element => {
      this.serviceCities.deleteCity(element.id).then((data) => {
        if (data.status !== 400 && data.status !== 403) {
          this.setState({ cities: cities })
          this.toast.show({
            severity: 'success',
            summary: 'Successful',
            detail: <T clave="mns_delete"/>,
            life: 3000,
          })
        }
      })
    });
    
    this.toast.show({
      severity: 'success',
      summary: 'Successful',
      detail: <T clave="mns_deleteAll"/>,
      life: 3000,
    })
  }
  render() {
    const header = (
      <div className="table-header">
        <h3 className="p-m-0">
          <T clave="titListCities"></T>
        </h3>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => this.setState({ globalFilter: e.target.value })}
            placeholder="Search..."
          />
        </span>
      </div>
    )
    const cityCreateDialogFooter= (
      <Fragment>
        <Button
          label={<T clave="button_cancel"/>}
          icon="pi pi-times"
          className="p-button-text"
          onClick={this.hideDialogCreate}
        />
        <Button
          label={<T clave="button_save"/>}
          icon="pi pi-check"
          className="p-button-text"
          onClick={this.addCity}
        />
      </Fragment>
    )
    const cityDialogFooter = (
      <Fragment>
        <Button
          label={<T clave="button_cancel"/>}
          icon="pi pi-times"
          className="p-button-text"
          onClick={this.hideDialog}
        />
        <Button
          label={<T clave="button_save"/>}
          icon="pi pi-check"
          className="p-button-text"
          onClick={this.saveCity}
        />
      </Fragment>
    )
    const deleteCityDialogFooter = (
      <Fragment>
        <Button
          label="No"
          icon="pi pi-times"
          className="p-button-text"
          onClick={this.hideDeleteCityDialog}
        />
        <Button
          label={<T clave="button_yes"/>}
          icon="pi pi-check"
          className="p-button-text"
          onClick={this.deleteCity}
        />
      </Fragment>
    )
    const deleteCitysDialogFooter = (
      <Fragment>
        <Button
          label="No"
          icon="pi pi-times"
          className="p-button-text"
          onClick={this.hideDeleteCitiesDialog}
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          className="p-button-text"
          onClick={this.deleteSelectedDialogs}
        />
      </Fragment>
    )

    return (
      <Fragment>
        <div className="datatable-crud-demo">
          <Toast ref={(el) => (this.toast = el)} />

          <Toolbar
            className="p-mb-4"
            left={this.leftToolbarTemplate}
            right={this.rightToolbarTemplate}
          ></Toolbar>

          <DataTable
            ref={(el) => (this.dt = el)}
            value={this.state.cities}
            selection={this.state.selectedCities}
            onSelectionChange={(e) =>
              this.setState({ selectedCities: e.value })
            }
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrar {first} a {last} de {totalRecords} ciudades"
            globalFilter={this.state.globalFilter}
            header={header}
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: '3rem' }}
            ></Column>
            <Column field="id" header="Id" sortable></Column>
            <Column field="name" header="Name" sortable></Column>           

            <Column body={this.actionBodyTemplate}></Column>
          </DataTable>

          <Dialog
            visible={this.state.cityDialog}
            style={{ width: '450px' }}
            header={<T clave="dialog_edit_title"/>}
            modal
            className="p-fluid"
            footer={cityDialogFooter}
            onHide={this.hideDialog}
          >
            <div className="p-field">
              <label htmlFor="name"><T clave="form_name"/></label>
              <InputText
                id="name"
                value={this.state.city.name}
                onChange={(e) => this.onInputChange(e, 'name')}
                required
                autoFocus
                className={classNames({
                  'p-invalid': this.state.submitted && !this.state.city.name,
                })}
              />
              {this.state.submitted && !this.state.city.name && (
                <small className="p-error"><T clave="dialog_edit_valNull"/></small>
              )}
            </div>
          </Dialog>
          <Dialog
            visible={this.state.cityCreateDialog}
            style={{ width: '450px' }}
            header={<T clave="dialog_create_title"/>}
            modal
            className="p-fluid"
            footer={cityCreateDialogFooter}
            onHide={this.hideDialogCreate}
          >
            <div className="p-field">
              <label htmlFor="name"><T clave="form_name"/></label>
              <InputText
                id="name"
                value={this.state.city.name}
                onChange={(e) => this.onInputChange(e, 'name')}
                required
                autoFocus
                className={classNames({
                  'p-invalid': this.state.submitted && !this.state.city.name,
                })}
              />
              {this.state.submitted && !this.state.city.name && (
                <small className="p-error"><T clave="dialog_edit_valNull"/></small>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={this.state.deleteCityDialog}
            style={{ width: '450px' }}
            header={ <T clave="dialog_delete_title"/>}
            modal
            footer={deleteCityDialogFooter}
            onHide={this.hideDeleteCityDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle p-mr-3"
                style={{ fontSize: '2rem' }}
              />
              {this.state.city && (
                <span>
                  <T  width="width='290px'" clave="question_dialog_delete"/> <b style={{float:'right',marginTop:'-20px'}}> {this.state.city.name}?</b>
                </span>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={this.state.deleteCitiesDialog}
            style={{ width: '450px' }}
            header="Confirm"
            modal
            footer={deleteCitysDialogFooter}
            onHide={this.hideDeleteCitiesDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle p-mr-3"
                style={{ fontSize: '2rem' }}
              />
              {this.state.city && (
                <span>
                    <T  clave="question_dialog_deleteAll"/>
                </span>
              )}
            </div>
          </Dialog>
        </div>
      </Fragment>
    )
  }
}
