import { Component } from 'react'
import { DataView, DataViewLayoutOptions } from 'primereact/dataview'
import { ServiceCities } from '../services/ServiceCities'
import { Button } from 'primereact/button'
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
      <div className="p-col-12">
        <div className="city-list-item">
          <div className="city-list-detail">
            <div className="city-name">Nombre ciudad</div>
            <div className="city-description">Dia</div>
          </div>
          <div className="city-list-action">
            <span className="city-price">precio</span>
            <span className={`city-badge `}>status</span>
          </div>
        </div>
      </div>
    )
  }

  renderGridItem(data) {
    return (
      <div className="p-col-12 p-md-4">
        <div className="city-grid-item card">
          <div className="city-grid-item-top">
            <div>
              <i className="pi pi-tag city-category-icon"></i>
              <span className="city-category">Categoria</span>
            </div>
            <span className={`city-badge `}>status</span>
          </div>

          <div className="city-grid-item-bottom">
            <span className="city-price">precio</span>
          </div>
        </div>
      </div>
    )
  }

  itemTemplate(city, layout) {
    if (!city) {
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
