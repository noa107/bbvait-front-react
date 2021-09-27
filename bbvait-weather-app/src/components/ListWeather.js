import { Component } from 'react'
import { DataView, DataViewLayoutOptions } from 'primereact/dataview'
import { ServiceCities } from '../services/ServiceCities'
import { Button } from 'primereact/button'
import  Weather  from './Weather';
import WeatherReduce from './WeatherReduce';
export class ListWeather extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cities: null,
      layout: 'grid',
      loading: true,
      first: 0,
      totalRecords: 0,
    }

    this.rows = 6
    this.serviceCities = new ServiceCities()
    this.itemTemplate = this.itemTemplate.bind(this)
    this.onPage = this.onPage.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      this.serviceCities.getCities().then((data) => {
        console.log("data",data)
        this.datasource = data
        this.setState({
          totalRecords: data.length,
          cities: this.datasource.slice(0, this.rows),
          loading: false,
        })
      })
    }, 1000)
  }

  onPage(event) {
    this.setState({
      loading: true,
    })
    //imitate delay of a backend call
    setTimeout(() => {
      const startIndex = event.first
      const endIndex = Math.min(
        event.first + this.rows,
        this.state.totalRecords - 1,
      )
      const newCities =
        startIndex === endIndex
          ? this.datasource.slice(startIndex)
          : this.datasource.slice(startIndex, endIndex)

      this.setState({
        first: startIndex,
        cities: newCities,
        loading: false,
      })
    }, 1000)
  }

  renderListItem(data) {
    return (
      <Weather city={data.name}/>
    )
  }

  renderGridItem(data) {
    return (
      <div className="p-col-12 p-md-4">
      <div className="city-grid-item card">
        <WeatherReduce city={data.name}/>
      </div>
  </div>
    )
  }

  itemTemplate(city, layout) {
    console.log("entra con ",layout)
    console.log("entra con ",city)
    if (!city) {console.log("vaya con ",city)
      return
    }

    if (layout === 'list') return this.renderListItem(city)
    else if (layout === 'grid') return this.renderGridItem(city)
  }

  renderHeader() {
    let onOptionChange = (e) => {
      this.setState({ loading: true }, () => {
        setTimeout(() => {
          this.setState({
            loading: false,
            layout: e.value,
          })
        }, 1000)
      })
    }

    return (
      <div style={{ textAlign: 'left' }}>
        <DataViewLayoutOptions
          layout={this.state.layout}
          onChange={onOptionChange}
        />
      </div>
    )
  }

  render() {
    const header = this.renderHeader()

    return (
      <div className="dataview-demo">
        <div className="card">
          <DataView
            value={this.state.cities}
            layout={this.state.layout}
            header={header}
            itemTemplate={this.itemTemplate}
            lazy
            paginator
            paginatorPosition={'both'}
            rows={this.rows}
            totalRecords={this.state.totalRecords}
            first={this.state.first}
            onPage={this.onPage}
            loading={this.state.loading}
          />
        </div>
      </div>
    )
  }
}
