/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { SimpleStarshipTypes, StarshipsTypes } from './types';
import "./style.css"

const Starships =() => {
    const [starships, setStarships] = useState<SimpleStarshipTypes[] | null>(null);
    const [changePage, setChangePage] = useState(1);

    const nextPage = () => {
        setChangePage(changePage + 1);
    }

    const previousPage = () => {
        setChangePage(changePage - 1);
    }

    useEffect(() => {
        setStarships([]);
        const fetchData = async () => {
            try {
                const response = await axios.get<StarshipsTypes>(`https://swapi.dev/api/starships/?page=${changePage}`);
                const results = response.data.results;
                setStarships(results);
              } catch (error) {
                console.error(error);
              }
        };
        fetchData();
    }, [changePage]);

    if(starships === null) {
        return(
            <div className="d-flex justify-content-center align-items-center">Loading data...</div>
        )
    }
    console.log(starships)

    let changePageImageNumber = (changePage - 1) * 10 + 1

    return (
        <>
            <div className="d-flex justify-content-around align-items-baseline my-5">
                <button onClick={previousPage} disabled={changePage === 1} className="btn btn-warning btn-lg btn-radius ">
                    <i className="fas fa-arrow-left"></i>
                </button>
                <button onClick={nextPage} disabled={changePage === 4} className="btn btn-warning btn-lg btn-radius">
                    <i className="fas fa-arrow-right"></i>
                </button>
            </div>
            <div className='d-flex flex-row justify-content-center flex-wrap m-3'>
            {starships.length !== 0 ? (
                starships.map((starship) => (
                    <div key={starship.name} className='d-flex flex-column m-5 align-items-center'>
                        <h2>{starship.name}</h2>                   
                        <img 
                            className='starships-image'
                            src={require(`../../assets/starships/${String( changePageImageNumber++ )}.jpg`)}
                            alt="testowo"
                            onError={(e) => {e.currentTarget.src = `../../assets/starships/1.jpg`}}
                        />

                        <div className='d-flex flex-column'>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Model:</strong></p> <p>{starship.model}</p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Starship class:</strong></p> <p>{starship.starship_class}</p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Manufacturer:</strong></p> <p>{starship.manufacturer}</p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Cost:</strong></p> <p>{starship.cost_in_credits}</p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Length:</strong></p> <p>{starship.length}</p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Speed:</strong></p> <p>{starship.max_atmosphering_speed}</p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Crew:</strong></p> <p>{starship.crew}</p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Passengers:</strong></p> <p>{starship.passengers}</p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Cargo capacity:</strong></p> <p>{starship.cargo_capacity}</p>
                            </div>
                        </div>
                    </div>
                    ))
                    ) : (
                        <p>Loading...</p>
                    )}
            </div>
        </>
    )
}

export default Starships;