import React from 'react'
import { properties } from './ConfigurationContext'
import { PropTypes } from 'prop-types'

export class ConfigurationProvider extends React.Component {
  constructor() {
    super()
    this.state = { configuration: properties.conf }
  }
  getChildContext() {
    return {
      configuration: this.state.configuration,
    }
  }
  render() {
    return this.props.children
  }
}

ConfigurationProvider.childContextTypes = {
  configuration: PropTypes.shape({
    version: PropTypes.string,
  }),
}
