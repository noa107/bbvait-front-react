import axios from "axios";

export const apiAxios = axios.create({
  withCredentials: false,
});

export class ServiceCities {
  constructor() {
    this.server = "http://localhost:8080/";
    this.simulated = false;
  }

  genFullUrl(sufijo, simulatedScr) {
    return !this.simulated && simulatedScr
      ? this.server + sufijo
      : simulatedScr;
  }

  getCities() {
    let url = this.genFullUrl("cities", "notSimulation");
    return apiAxios.get(url).then((result) => result.data).catch((error) =>
    error.response ? error.response : "response without error"
  );
  }
  addCity(city) {
    let url = this.genFullUrl("cities", "notSimulation");
    return apiAxios
      .post(url, city)
      .then((result) => result.data)
      .catch((error) =>
        error.response ? error.response : "response without error"
      );
  }

  save(id, city) {
    let url1 = this.genFullUrl("cities/" + id, "paraSimulacion");
    return apiAxios
      .put(url1, city)
      .then((res) => res.data)
      .catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });
  }
  deleteCity(id) {
    let url1 = this.genFullUrl("cities/" + id, "paraSimulacion");
    return apiAxios
      .delete(url1)
      .then((res) => res.data)
      .catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });
  }
}
