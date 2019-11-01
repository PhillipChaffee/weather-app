import React, { ChangeEvent } from 'react';
import WeatherData from './models/weather-data';

interface AppProps { }
interface AppState {
  zipcode: number | null;
  temp: number | null;
  name: string;
  message: string;
}

export default class App extends React.Component<AppProps, AppState>{
  constructor(props: AppProps) {
    super(props);

    this.state = { zipcode: null, temp: null, name: '', message: '' };

    this.handleChange = this.handleChange.bind(this);
    this.getTempForZip = this.getTempForZip.bind(this);
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="box has-text-centered">
            <h1 className="title is-1">The Weather App</h1>
            <h3 className="subtitle">Get the current ℉ for a zipcode.</h3>
            <div className="columns is-centered">
              <div className="column is-one-quarter">
                <div className="field has-addons">
                  <div className="control">
                    <input className="input" type="text" name="zipcode" placeholder="Zipcode" onChange={this.handleChange} />
                  </div>
                  <div className="control">
                    <a className="button is-info" onClick={() => this.getTempForZip(this.state.zipcode)}>
                      Get Temp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {this.state.temp !== null &&
              <p>The current temp{this.state.name !== '' && ` in ${this.state.name}`} is {this.state.temp} ℉.</p>
            }

            {this.state.message !== 'null' && <p>{this.state.message}</p>}
          </div>
        </div>
      </section>
    );
  }

  handleChange(event: ChangeEvent<any>) {
    let fieldName = event.target.name;
    let fieldVal = event.target.value;

    this.setState({ [fieldName]: fieldVal } as Pick<AppState, any>);
  }

  getTempForZip(zipcode: number | null): void {
    if (zipcode === null)
      return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=62e22018eeed34e8fdd41174de9a8fb0&units=imperial`)
      .then(response => {
        if (response.status !== 200) {
          return null as unknown as WeatherData;
        }

        return response.json() as Promise<WeatherData>;
      })
      .then((data: WeatherData) => {
        if (data !== null) {
          this.setState({ temp: data.main.temp, name: data.name, message: '' });
        } else {
          this.setState({ temp: null, name: '', message: 'The temperature could not be retrieved for this zipcode. Please try again.' });
        }
      });
  }
}
