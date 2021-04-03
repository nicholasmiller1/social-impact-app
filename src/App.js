import {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [data, setData] = useState();
  const [measurementType, setMeasurementType] = useState("mavg");
  const [dataType, setDataType] = useState("tas");
  const [startYear, setStartYear] = useState("1980");
  const [endYear, setEndYear] = useState("1999");
  const [countryCode, setCountryCode] = useState("USA");

  useEffect(() => {
    const makeAPIRequest = async () => {
      const url = `http://climatedataapi.worldbank.org/climateweb/rest/v1/country/${measurementType}/${dataType}/${startYear}/${endYear}/${countryCode}`;

      let response = await fetch(url);
      response = await response.json();
      console.log(response);
      setData(response[0]);
    }

    makeAPIRequest();
  }, [measurementType, dataType, startYear, endYear, countryCode]);

  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  return (
    <div className="App">
      <h1>Social Impact App</h1>
      {data !== undefined && data.monthVals.map((value,key) => <p>{month[key]}: {value.toFixed(2)} &#8451;</p>)}
    </div>
  );
}

export default App;
