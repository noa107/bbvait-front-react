import React, { Component } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
export class AppInlineProfile extends Component {

    constructor() {
        super();
        this.state = {
            expanded: false
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        this.setState({expanded: !this.state.expanded});
        event.preventDefault();
    }

    render() {
        return  <div>
                    <div className={classNames('profile', {'profile-expanded': this.state.expanded})}>
                        <a onClick={this.onClick}>
                            <img alt="Profile" className="profile-image" src="assets/images/CvFoto.png" />
                            <span className="profile-name">Ainhoa Sánchez</span>
                            <i className="fa fa-fw fa-caret-down"></i>
                            <span className="profile-role">FullStack</span>
                        </a>
                    </div>
                    
                    <ul className="layout-menu profile-menu">
                        <li role="menuitem">
                            
                            <Link to={"/CV/"} tabIndex={this.state.expanded ? null : '-1'}>
                            CV
                            </Link>
                            <div className="layout-menu-tooltip">
                                <div className="layout-menu-tooltip-arrow"></div>
                                <div className="layout-menu-tooltip-text">Profile</div>
                            </div>
                        </li>
                      
                      
                        
                    </ul>
                </div>
    }
}