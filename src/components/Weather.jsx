import  { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import wind_icon from '../assets/wind.png'
import snow_icon from '../assets/snow.png'
import drizzle_icon from '../assets/drizzle.png'

const Weather = () => {
    const inputRef=useRef()
    const[weathderData,setWeathderData]=useState(false)
    const allIcons={
        "01d":clear_icon,
        "01n":clear_icon,
        "02d":cloud_icon,
        "02n":cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04d":drizzle_icon,
        "04n":drizzle_icon,
        "09d":rain_icon,
        "09n":rain_icon,
        "10d":rain_icon,
        "10n":rain_icon,
        "13d":snow_icon,
        "13n":snow_icon,

    }
    const search =async(city)=>{
        if(city===""){
            alert("Enter City Name");
            return ;
        }
        try {
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_ID}`
            const response =await  fetch(url);
            const data=await response.json();
           
            console.log(data);
            const icon=allIcons[data.weather[0].icon] || clear_icon;
            setWeathderData({
                humidity:data.main.humidity,
                windSpeed:data.wind.speed,
                temperature:data.main.temp ,
                location:data.name,
                icon:icon

            })
            
        } catch (error) {
            console.log(error)
            
        }
    }
    useEffect(()=>{
        search("Tunisia")
    },[])
  return (
    <div className='weather'>
       <div className="search-bar">
        <input type="text"  placeholder='search' ref={inputRef}/>
        <img src={search_icon} alt=""  onClick={()=>{
            search(inputRef.current.value)
        }}/>
        </div> 
        <img src={weathderData.icon} alt="" className='weather_icon'/>
        <p className='temperature'>{weathderData.temperature}°c</p>
        <p className='location'>{weathderData.location}</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt="" />
                <div>

                    <p>{weathderData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={wind_icon} alt="" />
                <div>

                    <p>{weathderData.windSpeed} Km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Weather
