/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./style.css"
import { VehiclesTypes, SimpleVehicle } from './types';

const Vehicles =() => {
    const [optionApi, setOptionApi] = useState<VehiclesTypes | null>(null);
    const [vehicles, setVehicles] = useState<SimpleVehicle[] | null>(null);
    const [changePage, setChangePage] = useState(1); 

    let changePageImageNumber = (changePage - 1) * 10 + 1

    const nextPage = () => {
        setChangePage(changePage + 1);
    }

    const previousPage = () => {
        setChangePage(changePage - 1);
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<VehiclesTypes>(`https://swapi.dev/api/vehicles/?page=${changePage}`);
                const results = response.data;
                setOptionApi(results);
                setVehicles(results.results);
              } catch (error) {
                console.error(error);
              }
        };
        fetchData();
    }, [changePage]);

    if(vehicles === null) {
        return(
            <div className="d-flex justify-content-center align-items-center">Loading data...</div>
        )
    }

    console.log(vehicles)

    return (
        <>
            <div className="d-flex justify-content-around align-items-baseline my-5">
                <button onClick={previousPage} disabled={optionApi?.previous === null} className="btn btn-warning btn-lg btn-radius ">
                    <i className="fas fa-arrow-left"></i>
                </button>
                <button onClick={nextPage} disabled={optionApi?.next === null} className="btn btn-warning btn-lg btn-radius">
                    <i className="fas fa-arrow-right"></i>
                </button>
            </div>
            <div className='d-flex flex-row justify-content-center flex-wrap m-3'>
                {vehicles.map(vehicle => (
                    <div key={vehicle.name} className='d-flex flex-column m-5 align-items-center'>
                        <h2>{vehicle.name}</h2>                        
                        <img 
                            className='vehicles-image'
                            src={require(`../../assets/vehicles/${String(changePage === 3 || changePage === 4? 'default' : changePageImageNumber++)}.jpg`)} 
                        />
                        <div className='d-flex flex-column'>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Model:</strong></p> <p>{vehicle.model}</p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Manufacturer:</strong></p> <p>{vehicle.manufacturer}</p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Cost:</strong></p> <p>{vehicle.cost_in_credits}</p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Length:</strong></p> <p>{vehicle.length}</p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Max speed:</strong></p> <p>{vehicle.max_atmosphering_speed}</p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Crew:</strong></p> <p>{vehicle.crew}</p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Passengers:</strong></p> <p>{vehicle.passengers}</p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Cargo capacity:</strong></p> <p>{vehicle.cargo_capacity}</p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Vehicle class:</strong></p> <p>{vehicle.vehicle_class}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Vehicles;