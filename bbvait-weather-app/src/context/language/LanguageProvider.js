import React from "react";
import { LanguageContext, translations } from "./LanguageContext";
import PropTypes from "prop-types";
export class LanguageProvider extends React.Component {
  constructor() {
    super();
    this.state = { language: "" };
  }
  componentDidMount() {
    const navLangString = navigator.language.split("-")[0];
    this.setState((state) => ({
      language: translations.hasOwnProperty(navLangString)
        ? translations[navLangString]
        : translations.es,
    }));
  }
  getChildContext() {
    return {
      translations: this.state.language,
    };
  }

  render() {
    return (
      <LanguageContext.Provider value={this.state.language}>
        {this.props.children}
      </LanguageContext.Provider>
    );
  }
}
LanguageProvider.childContextTypes = {
  translations: PropTypes.any,
};
