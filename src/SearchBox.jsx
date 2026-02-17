import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import "./SearchBox.css";
const API_KEY=import.meta.env.VITE_WEATHER_API_KEY;


import { useState } from 'react';

export default function SearchBox({updateInfo})
{

  
  let [city,setCity]=useState("");
let [error,setError]=useState(false);


   const API_URL = `https://api.openweathermap.org/data/2.5/weather`;



 let getWheatherInfo=async()=>{

try{


 let response= await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`)
let jsonresponse= await response.json();


let result = {
  city: city,
  temp: jsonresponse.main.temp,
  tempMin: jsonresponse.main.temp_min,
  tempMax: jsonresponse.main.temp_max,
  humidity: jsonresponse.main.humidity,
  feelsLike: jsonresponse.main.feels_like,
  weather: jsonresponse.weather[0].description
};

console.log(result);
return result;

 }catch(err)
 {
 throw err;
 }
}



let handleChange=(event)=>{
setCity(event.target.value);
}

let handleSubmit = async (event) => {

  try{
event.preventDefault();

  let newinfo = await getWheatherInfo();
  updateInfo(newinfo);   // 🔥 send data to parent

  setCity("");
  }
  catch(err)
  {
 setError(true);
  }
  
}



  return(
    <div className='SearchBox'>
     
      <form onSubmit={handleSubmit}>
 <TextField id="city" label="City Name" variant="outlined" required value={city} onChange={handleChange}/>
 <br></br>
 <br></br>
 <Button variant="contained" type='submit'>
        Search
        </Button>
        {error && <p style={{color:"red"}}>No such place exists </p> }
      
      </form>
    </div>
  )
}