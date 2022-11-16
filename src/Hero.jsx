import axios from "axios";
import React, { useState } from "react";
import gif from './SVTk-unscreen.gif'

function Hero() {

    let [data, setData] = useState({})
    let [location, setLocation] = useState('')
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=3dd43ef93c6aa1b4ef082973d326a111`

    let searchLocation = (event) => {
        if (event.key === 'Enter') {
            axios.get(url).then(response => {
                setData(response.data)
                console.log(response.data)
            })
            setLocation('')

        }
    }
    let DTime = new Date();
    let myDate = DTime.getDate() + "/" + (DTime.getMonth() + 1) + "/" + DTime.getFullYear()

    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = weekday[DTime.getDay()];

    return (
        <div className="flex flex-col justify-center items-center max-w-full h-[100vh] relative
    bg-[#161623] text-[#ffffff80] before:bg-gradient-to-tr before:from-[#461f6d] before:to-[#667eea] before:w-[30rem] before:h-[30rem] before:left-[-100px] before:top-[-50px] before:absolute before:rounded-[50%]
       after:bg-gradient-to-tr after:from-[#501875] after:to-[#ED1E79] after:w-[30rem] after:h-[30rem] after:right-[-100px] after:bottom-[-50px] after:absolute after:rounded-[50%]" >
            <input type="text" value={location}
                onChange={event => setLocation(event.target.value)}
                onKeyPress={searchLocation}
                placeholder="Enter location"
                className=" w-[300px] z-40 p-3 rounded-[20px] 
           focus:outline-none
           bg-[#ffffff1a]
           backdrop-blur-[10px]
           "
            />
            {/*Overlay */}
            {data.name !== undefined &&
                <div className="scale-in-hor-center flex flex-col justify-evenly items-center w-[300px] h-[400px] bg-[#ffffff1a] shadow-[#00000080] rounded-[20px] backdrop-blur-[10px] z-40 mt-10">
                    <div className="flex flex-col justify-between w-[95%] h-[45%] ">
                        <span className="flex justify-between w-full h-[45%]">
                            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weatherIcon" />

                            <div className="flex flex-col justify-between w-[50%] h-full">
                                <h1 className="text-[25px]">{day}</h1>
                                <h4 className="text-[15px]">{myDate}</h4>
                            </div>
                        </span>
                        <div className="flex justify-between w-full h-full">
                            <span className="flex flex-col justify-between w-full h-full">
                                {data.main ? <h1 className=" text-[50px] font-[600]">{parseInt(data.main.temp - 273.15)}°C</h1> : null}
                                {data.weather ? <h4 className="font-[700] text-[20px]">{data.weather[0].main}</h4> : null}

                            </span>
                            <span className="flex justify-start items-center w-full h-full text-[25px]">{data.name}</span>
                        </div>
                    </div>
                    <div className="flex justify-between w-[95%] h-[45%]">
                        <span className=" w-[50%] h-full">
                            <h1 className="flex justify-evenly flex-col w-full h-[32%] font-[500] text-[20px] "><span className="text-[15px] text-[#ffffffcb]">PRECIPITATION</span>{data.main ? parseInt(data.main.feels_like / 100) : null}%</h1>
                            <h1 className="flex justify-evenly flex-col w-full h-[32%] font-[500] text-[20px] "><span className="text-[15px] text-[#ffffffcb]">HUMIDITY</span>{data.main ? data.main.humidity : null}%</h1>
                            <h1 className="flex justify-evenly flex-col w-full h-[32%] font-[500] text-[20px] "><span className="text-[15px] text-[#ffffffcb]">WIND</span>{data.wind ? data.wind.speed : null} Km/h</h1>
                        </span>
                        <span className="w-[70%] h-full overflow-hidden">
                            <img src={gif} alt="" />
                        </span>
                    </div>
                </div>}
        </div>
    )
}

export default Hero
