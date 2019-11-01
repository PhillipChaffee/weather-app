export default class WeatherData {
    name!: string;
    main!: MainWeatherData;
}

class MainWeatherData {
    temp!: number;
}