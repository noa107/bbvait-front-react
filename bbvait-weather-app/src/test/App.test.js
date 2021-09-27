import { fireEvent, render, screen } from "@testing-library/react";
import { LanguageProvider } from '../context/language/LanguageProvider'
import { ConfigurationProvider } from '../context/configuration/ConfigurationProvider'
import { prettyDOM } from "@testing-library/react";
import  '@testing-library/jest-dom/extend-expect'
import { HashRouter } from 'react-router-dom'
import App from '../App'


describe('testing render application', () => {
  let component
  beforeEach(() =>{
     component = render(
      <ConfigurationProvider>
        <LanguageProvider>
          <HashRouter>
            <App/>
          </HashRouter>
        </LanguageProvider>
      </ConfigurationProvider>,
    )
  })
  test('renders header', () => {   
    const linkElement = screen.getByText('Weather App')
    expect(linkElement).toBeInTheDocument()
  })

  test('renders menu options', () => {
    component.getAllByText('Home')
    component.getAllByText('City Weather List')
    component.getAllByText('Weather')
    component.getAllByText('The Weather in my cities')
    component.getAllByText('CV')
  })
  test('renders my profile', () => {  
    component.getAllByText(/Ainhoa/i)
  })
  test('renders footer', () => {  
    component.getAllByText('City to find')
  })
  test("renders content Weather from footer", () => {   
    const city = 'Madrid';     
   let input = document.getElementById("inputfindWeather");  
   fireEvent.change(input, {target: {value: city}})
   const link = document.getElementById("findWeather")  
   fireEvent.click(link)
   component.getByText('Loading')    
  });
})
