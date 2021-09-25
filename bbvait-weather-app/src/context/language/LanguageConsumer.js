import React from "react";

import { LanguageContext } from "./LanguageContext";
export default class T extends React.Component {
  render() {
    return (
      <LanguageContext.Consumer>
        {(language) => (
          <div style={{ width: this.props.width }}>{language[this.props.clave]}</div>
        )}
      </LanguageContext.Consumer>
    );
  }
}
