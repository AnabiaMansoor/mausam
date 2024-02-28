import React, { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'; // Import the desired icon
import { FaStreetView } from "react-icons/fa6";
import { TbTemperatureMinus } from "react-icons/tb";
import { TbTemperaturePlus } from "react-icons/tb";





import "./css/style.css";

const Tempapp = () => {
    const [city, setCity] = useState(null);
    const [temp, setTemp] = useState(null);
    const [minTemp, setMinTemp] = useState(null);
    const [maxTemp, setMaxTemp] = useState(null);
    const [search, setSearch] = useState("karachi");

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=9efe4b24067138cb313455c90e4f52d0`;
                const response = await fetch(url);
                const jsondata = await response.json();
                console.log(jsondata); // Check the fetched data in the console

                if (jsondata.main && jsondata.main.temp) {
                    setTemp(jsondata.main.temp); // Set the temperature
                    setMinTemp(jsondata.main.temp_min); // Set the min temperature
                    setMaxTemp(jsondata.main.temp_max); // Set the max temperature
                } else {
                    console.error("Temperature data not available");
                }

                setCity(jsondata.name); // Set the city name
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchApi();
    }, [search]); // Add search as a dependency to useEffect

    return (
        <>
            <div className='box'>
                <div className='inputData'>
                    <input type="search" className='inputfield'
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </div>
                {!city ? (
                    <p>No data found</p>
                ) : (
                    <div>
                        <div className='info'>
                            <h2 className='location'>
                            <FaStreetView /> {city} {/* Display the fetched city name here */}
                            </h2>
                            <h1 className="temp">
                                {temp} °C {/* Display the fetched temperature here */}
                            </h1>
                            <h2 className="tempin_max">Min :<TbTemperatureMinus /> {minTemp} | Max :<TbTemperaturePlus /> {maxTemp}</h2>
                        </div>

                        <div class="ocean">
                            <div class="wave"></div>
                            <div class="wave"></div>
                        </div>
                    </div>
                )}
            </div>

        </>
    );
};

export default Tempapp;
