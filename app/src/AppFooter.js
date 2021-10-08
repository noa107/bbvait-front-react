import React, { Component } from 'react'
import { InputText } from 'primereact/inputtext'
import T from './context/language/LanguageConsumer'
import { Panel } from 'primereact/panel';
import { Ripple } from 'primereact/ripple';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button'
import './App.css'
export class AppFooter extends Component {
  constructor() {
    super()
    this.state = {
      city: null,
    }
    this.template = this.template.bind(this);
  }
  template(options) {
    const toggleIcon = options.collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up';
    const className = `${options.className} p-jc-start`;
    const titleClassName = `${options.titleClassName} p-pl-1`;

    return (
        <div className={className}>
            <button className={options.togglerClassName} onClick={options.onTogglerClick}>
                <span className={toggleIcon}></span>
                <Ripple />
            </button>
            <span className={titleClassName}>
                Header
            </span>
        </div>
    )
}
  render() {
    const submitHandler = () => {
       this.props.send(this.state.city);
    }
    return (
      <div className="layout-footer">
      <Panel header={<T clave="titPanelPie"/>} toggleable >  
        <div className="p-formgroup-inline panelFooter">
          <div className="appLogo">
            <span className="footer-text-left"></span>
          </div>
          <div className="p-field">
            <span className="p-float-label p-input-icon-left">
              <i className="pi pi-search" />
              <InputText
                id="inputfindWeather"
                value={this.state.city}
                onChange={(e) => this.setState({ city: e.target.value })}
              />
              <label htmlFor="inputfindWeather" className="mnsInput">
                <T clave="labelFindWeather" />
              </label>
            </span>
          </div>
          <div className="p-field">
            <Button className="p-button-primary" >
              <Link to={"/weather"}  id="findWeather" onClick={submitHandler}>
              <span>
                <T clave="findWeather" />
              </span>
            </Link></Button>
          </div>
        </div>
        </Panel>
      </div>
 
      
    )
  }
}
