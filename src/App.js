import {useState, useEffect} from 'react';
import {TextField, Select, MenuItem} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete'
import countryMappings from "./countrymappings.json";
import './App.css';

function App() {
  const [data, setData] = useState();
  const [measurementType, setMeasurementType] = useState("mavg");
  const [dataType, setDataType] = useState("tas");
  const [timeSpan, setTimeSpan] = useState(1980);
  const [country, setCountry] = useState({
    "name": "United States of America",
    "code": "USA"
  });

  useEffect(() => {
    const url = `http://climatedataapi.worldbank.org/climateweb/rest/v1/country/${measurementType}/${dataType}/${timeSpan}/${timeSpan + 19}/${country !== null ? country.code : ""}`;

    fetch(url).then((response) => response.json()).then(res => {
      console.log(res);
      setData(res[0])
    }).catch((error) => {
      console.log(error);
      setData(undefined);
    });
  }, [measurementType, dataType, timeSpan, country]);
  console.log(measurementType);

  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  return (
    <div className="App">
      <h1>Climate Data App</h1>

      <div style={{ display: "flex", justifyContent: "center", padding: "5px" }}>
        <Autocomplete
          options={countryMappings}
          getOptionLabel={(option) => option.name}
          style={{ width: 300, margin: "5px" }}
          renderInput={(params) => <TextField {...params} label="Choose Country" variant="outlined" />}
          value={country}
          onChange={(event, newCode) => {
            setCountry(newCode);
          }}
        />
        <Select
          value={timeSpan}
          onChange={(event) => setTimeSpan(event.target.value)}
          style={{ width: 150, margin: "5px" }}
          variant="outlined"
        >
          <MenuItem value={1920}>1920 - 1939</MenuItem>
          <MenuItem value={1940}>1940 - 1959</MenuItem>
          <MenuItem value={1960}>1960 - 1979</MenuItem>
          <MenuItem value={1980}>1980 - 1999</MenuItem>
          <MenuItem value={2020}>2020 - 2039</MenuItem>
          <MenuItem value={2040}>2040 - 2059</MenuItem>
          <MenuItem value={2060}>2060 - 2079</MenuItem>
          <MenuItem value={2080}>2080 - 2099</MenuItem>
        </Select>
        <Select
          value={dataType}
          onChange={(event) => setDataType(event.target.value)}
          style={{ width: 150, margin: "5px" }}
          variant="outlined"
        >
          <MenuItem value="tas">Temperature</MenuItem>
          <MenuItem value="pr">Precipitation</MenuItem>
        </Select>
        <Select
          value={measurementType}
          onChange={(event) => setMeasurementType(event.target.value)}
          style={{ width: 150, margin: "5px" }}
          variant="outlined"
        >
          <MenuItem value="mavg">Monthly Average</MenuItem>
          <MenuItem value="annualavg">Annual Average</MenuItem>
        </Select>
      </div>

      {data !== undefined && data.monthVals !== undefined && data.monthVals.map((value,key) => <p key={key}>{month[key]} Average: {value.toFixed(2)} {dataType === "tas" ? "°C" : "mL"}</p>)}
      {data !== undefined && data.annualData !== undefined && data.annualData.map((value, key) => <p key={key}>Annual Average: {value.toFixed(2)} {dataType === "tas" ? "°C" : "mL"}</p>)}
      {data === undefined && <p>Request Failed: One or more parameters are empty or not allowed</p>}
    </div>
  );
}

export default App;
