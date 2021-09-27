import './App.css';

import classNames from 'classnames';
import React, { Component } from 'react';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppTopbar } from './AppTopbar';
import { Toast } from 'primereact/toast';
import T from './context/language/LanguageConsumer';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Route } from 'react-router-dom';
import { AppInlineProfile } from './AppInlineProfile';
import { ListCities } from './components/ListCities';
import { Home } from './components/Home';
import { ListWeather } from './components/ListWeather';
import  Weather  from './components/Weather';
import { Cv } from './components/Cv';
class App extends Component {
  constructor() {
    super();
    this.state = {
      layoutMode: 'static',
      profileMode: 'inline',
      layoutCompact: true,
      overlayMenuActive: false,
      staticMenuDesktopInactive: false,
      staticMenuMobileActive: false,
      rotateMenuButton: false,
      topbarMenuActive: false,
      activeTopbarItem: null,
      darkMenu: true,
      menuActive: false,
      darkTheme: true,
      cityToFind:"Madrid"
    }

    this.onDocumentClick = this.onDocumentClick.bind(this)
    this.onMenuClick = this.onMenuClick.bind(this)
    this.onMenuButtonClick = this.onMenuButtonClick.bind(this)
    this.onTopbarMenuButtonClick = this.onTopbarMenuButtonClick.bind(this)
    this.onTopbarItemClick = this.onTopbarItemClick.bind(this)
    this.onMenuItemClick = this.onMenuItemClick.bind(this)
    this.onRootMenuItemClick = this.onRootMenuItemClick.bind(this)   
    this.getCityForFind = this.getCityForFind.bind(this)
  }
  onMenuClick(event) {
    this.menuClick = true

    if (!this.isHorizontal()) {
      setTimeout(() => {
        this.layoutMenuScroller.moveBar()
      }, 500)
    }
  }

  onMenuButtonClick(event) {
    this.menuClick = true
    this.setState({
      rotateMenuButton: !this.state.rotateMenuButton,
      topbarMenuActive: false,
    })

    if (this.state.layoutMode === 'overlay') {
      this.setState({
        overlayMenuActive: !this.state.overlayMenuActive,
      })
    } else {
      if (this.isDesktop())
        this.setState({
          staticMenuDesktopInactive: !this.state.staticMenuDesktopInactive,
        })
      else
        this.setState({
          staticMenuMobileActive: !this.state.staticMenuMobileActive,
        })
    }

    event.preventDefault()
  }

  onTopbarMenuButtonClick(event) {
    this.topbarItemClick = true
    this.setState({ topbarMenuActive: !this.state.topbarMenuActive })
    this.hideOverlayMenu()
    event.preventDefault()
  }

  onTopbarItemClick(event) {
    this.topbarItemClick = true

    if (this.state.activeTopbarItem === event.item)
      this.setState({ activeTopbarItem: null })
    else this.setState({ activeTopbarItem: event.item })

    event.originalEvent.preventDefault()
  }

  onMenuItemClick(event) {
    if (!event.item.items) {
      this.hideOverlayMenu()
    }
    if (!event.item.items && this.isHorizontal()) {
      this.setState({
        menuActive: false,
      })
    }
  }

  onRootMenuItemClick(event) {
    this.setState({
      menuActive: !this.state.menuActive,
    })

    event.originalEvent.preventDefault()
  }

  onDocumentClick(event) {
    if (!this.topbarItemClick) {
      this.setState({
        activeTopbarItem: null,
        topbarMenuActive: false,
      })
    }

    if (!this.menuClick) {
      if (this.isHorizontal() || this.isSlim()) {
        this.setState({
          menuActive: false,
        })
      }

      this.hideOverlayMenu()
    }

    if (!this.rightPanelClick) {
      this.setState({
        rightPanelActive: false,
      })
    }

    this.topbarItemClick = false
    this.menuClick = false
    this.rightPanelClick = false
  }

  hideOverlayMenu() {
    this.setState({
      rotateMenuButton: false,
      overlayMenuActive: false,
      staticMenuMobileActive: false,
    })
  }

  isTablet() {
    let width = window.innerWidth
    return width <= 1024 && width > 640
  }

  isDesktop() {
    return window.innerWidth > 1024
  }

  isMobile() {
    return window.innerWidth <= 640
  }

  isOverlay() {
    return this.state.layoutMode === 'overlay'
  }

  isHorizontal() {
    return this.state.layoutMode === 'horizontal'
  }

  isSlim() {
    return this.state.layoutMode === 'slim'
  }

  createMenu() {
    this.menu = [
      {
        label: <T clave="menu_option1" />,
        icon: 'fa fa-home',
        command: () => {
          window.location = '#/home'
        },
      },
      {
        label: <T clave="menu_option2" />,
        icon: 'fa fa-building',
        command: () => {
          window.location = '#/list'
        },
      },
      { 
        label: <T clave="menu_option3" />,
        icon: 'fa fa-cloud',
        command: () => {
          window.location = '#/weather'
        },
      },
      {
        label: <T clave="menu_option4" />,
        icon: 'fa fa-cloud',
        command: () => {
          window.location = '#/ListWeather'
        },
      }
      
    ]
  }
  getCityForFind(city){
    this.setState({cityToFind:city})
  }
  render() {
    this.createMenu()
    let layoutClassName = classNames('layout-wrapper', {
      'menu-layout-static': this.state.layoutMode !== 'overlay',
      'menu-layout-overlay': this.state.layoutMode === 'overlay',
      'layout-menu-overlay-active': this.state.overlayMenuActive,
      'menu-layout-slim': this.state.layoutMode === 'slim',
      'menu-layout-horizontal': this.state.layoutMode === 'horizontal',
      'layout-menu-static-inactive': this.state.staticMenuDesktopInactive,
      'layout-menu-static-active': this.state.staticMenuMobileActive,
    })
    let menuClassName = classNames('layout-menu-container', {
      'layout-menu-dark': this.state.darkMenu,
    })

    return (
      <div className={layoutClassName}>
        <div>
          <AppTopbar           
            profileMode={this.state.profileMode}
            horizontal={this.props.horizontal}
            topbarMenuActive={this.state.topbarMenuActive}
            activeTopbarItem={this.state.activeTopbarItem}
            onMenuButtonClick={this.onMenuButtonClick}
            onTopbarMenuButtonClick={this.onTopbarMenuButtonClick}
            onTopbarItemClick={this.onTopbarItemClick}                      
          />

          <div className={menuClassName} onClick={this.onMenuClick}>
            <ScrollPanel
              ref={(el) => (this.layoutMenuScroller = el)}
              style={{ height: '100%' }}
            >
              <div className="menu-scroll-content">
                {this.state.profileMode === 'inline' &&
                  this.state.layoutMode !== 'horizontal' && (
                    <AppInlineProfile />
                  )}
                <AppMenu
                  model={this.menu}
                  onMenuItemClick={this.onMenuItemClick}
                  onRootMenuItemClick={this.onRootMenuItemClick}
                  layoutMode={this.state.layoutMode}
                  active={this.state.menuActive}
                />
              </div>
            </ScrollPanel>
          </div>

          <div className="layout-main">
            <Toast ref={(el) => (this.toast = el)} />
            <Route path="/home" component={Home} />
            <Route path="/ListWeather" component={ListWeather} />
            <Route 
            path="/weather"
            render={(routerProps) => (
              <Weather city={this.state.cityToFind}/>
            )}
             />
            <Route path="/CV" component={Cv} />
            <Route
              path="/list"
              render={(routerProps) => (
                <ListCities match={routerProps.match} mns={this.toast} />
              )}
            />
            <Route path="/" exact component={Home} />
          </div>
          <div className="layout-mask"></div>
          <AppFooter send={this.getCityForFind} />
        </div>
      </div>
    )
  }
}
export default App
