import classNames from 'classnames'
import { Toast } from 'primereact/toast'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Icon } from 'react-fa'
import ReactTooltip from 'react-tooltip'
import { apiAxios } from './services/ServiceCities'
import T from './context/language/LanguageConsumer'

export class AppTopbar extends Component {
  static defaultProps = {
    onMenuButtonClick: null,
    onTopbarMenuButtonClick: null,
    onTopbarItemClick: null,
    profileMode: null,
    horizontal: false,
    topbarMenuActive: false,
    activeTopbarItem: null,
  }

  static propTypes = {
    onMenuButtonClick: PropTypes.func.isRequired,
    onTopbarMenuButtonClick: PropTypes.func.isRequired,
    onTopbarItemClick: PropTypes.func.isRequired,
    profileMode: PropTypes.string.isRequired,
    horizontal: PropTypes.bool.isRequired,
    topbarMenuActive: PropTypes.bool.isRequired,
    activeTopbarItem: PropTypes.string,
  }

  constructor() {
    super()
    this.state = {
      loading: false,
      loadingError: '',
      status: '',
      loadingTelem: true,
      ultAct: 0,

      open: false,
      recalc: null,
    }

    this.disable = this.disable.bind(this)

    // Add a request interceptor
    apiAxios.interceptors.request.use(
      function (config) {
        this.setState({ loading: true, loadingError: '' })
        return config
      }.bind(this),
      function (error) {
        this.setState({ loading: false, loadingError: '' })
        return Promise.reject(error)
      }.bind(this),
    )
    // Add a response interceptor
    apiAxios.interceptors.response.use(
      function (response) {
        this.setState({ loading: false, loadingError: '' })
        return response
      }.bind(this),
      function (error) {
        this.setState({ loading: false, loadingError: error.message })
        this.addErrorMessage(error)
        return Promise.reject(error)
      }.bind(this),
    )
  }

  disable() {
    this.setState({ displayModal: false })
  }

  addErrorMessage(error) {
    let detail = error.message
    let summary = error.response ? error.response.status : ''
    let detailCustom = ''

    try {
      if (error) {
        let response = error.response
        let header = response.headers
        detailCustom = header.reason
      }
    } catch (e) {}

    if (error.response && error.response.status) {
      let status = '' + error.response.status
      this.setState({ status: status })

      switch (status) {
        case '404':
          detail = 'Recurso no  encontrado'
          summary = 'Error en la petición del cliente'
          break
        case '403':
          detail = this.context.translations.desMnsSinPerm
          summary = this.context.translations.mnsSinPerm
          break
        case '405':
          detail = 'Método no permitido'
          summary = 'Error en la petición del cliente'
          break
        case '408':
          detail = 'Timeout'
          summary = 'Error en la petición del cliente'
          break
        case '400':
          detail = detailCustom
          summary = 'Error en la validación de datos'
          break
        case '512':
          detail = detailCustom
          summary = 'Error en la petición'
          break
        case '513':
          detail = detailCustom
          summary = 'Petición abortada, se necesita información adicional'
          break
        default:
          detail = 'Error en la petición al cliente (' + status + ')'
          summary = 'Error en la petición'
          break
      }
    } else {
      switch (detail) {
        case 'Network error':
          detail = 'Error de conexión'
          summary = 'Error en la petición del cliente'
          break
        default:
          detail = 'Error en la petición al cliente'
          summary = 'Error en la petición'
          break
      }
    }

    this.toast.show({ severity: 'error', summary: summary, detail: detail })
  }

  onTopbarItemClick(event, item) {
    if (this.props.onTopbarItemClick) {
      this.props.onTopbarItemClick({
        originalEvent: event,
        item: item,
      })
    }
  }

  //funciones propias de la aplicación
  getLoadingStyle() {
    let color = this.state.loadingError
      ? '#e32e63'
      : this.state.loading
      ? '#00daff'
      : 'white'
    return color
  }

  render() {
    let topbarItemsClassName = classNames('topbar-items fadeInDown', {
      'topbar-items-visible': this.props.topbarMenuActive,
    })
    let loadingStyle = { color: this.getLoadingStyle() }

    return (
      <div className="topbar clearfix">
        <Toast
          ref={(el) => {
            this.toast = el
          }}
        ></Toast>
        <div className="topbar-left">
          <object
            data="assets/images/iconaplication.svg"
            type="image/svg+xml"
            lt="app"
            style={{
              width: '60px',
              height: '56px',
              marginTop: '-13px',
            }}
          ></object>
        </div>

        <div className="topbar-right">
          <button id="menu-button" onClick={this.props.onMenuButtonClick}>
            <i className="fa fa-angle-left"></i>
          </button>

          <button
            id="topbar-menu-button"
            onClick={this.props.onTopbarMenuButtonClick}
          >
            <i className="fa fa-bars"></i>
          </button>
          <div>
            <h1 data-tip data-for="infoTitle">
              <T clave="titleApp" />
            </h1>
            <ReactTooltip id="infoTitle">
              <span>Versión: {this.context.configuration.version}</span>
              <br></br>
            </ReactTooltip>
          </div>
          <ul className={topbarItemsClassName}>
            <li>
              <Icon
                id="loading"
                name="refresh"
                spin={this.state.loading}
                className="iconLoad"
                style={loadingStyle}
              />
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
AppTopbar.contextTypes = {
  configuration: PropTypes.shape({
    version: PropTypes.string,
  }),
  translations: PropTypes.any,
}
