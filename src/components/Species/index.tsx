/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./style.css"
import { SpeciesTypes, SimpleSpecies } from './types';

const Species =() => {
    const [optionApi, setOptionApi] = useState<SpeciesTypes | null>(null);
    const [species, setSpecies] = useState<SimpleSpecies[] | null>(null);
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
                const response = await axios.get<SpeciesTypes>(`https://swapi.dev/api/species/?page=${changePage}`);
                const results = response.data;
                setOptionApi(results);
                setSpecies(results.results);
              } catch (error) {
                console.error(error);
              }
        };
        fetchData();
    }, [changePage]);

    if(species === null) {
        return(
            <div className="d-flex justify-content-center align-items-center">Loading data...</div>
        )
    }

    console.log(species)

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
                {species.map(characker => (
                    <div key={characker.name} className='d-flex flex-column m-5 align-items-center'>
                        <h2>{characker.name}</h2>                        
                        <img 
                            className='species-image'
                            src={require(`../../assets/species/${String(changePageImageNumber++)}.jpg`)} 
                        />
                        <div className='d-flex flex-column'>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Classification:</strong></p> <p>{characker.classification}</p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Designation:</strong></p> <p>{characker.designation}</p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Language:</strong></p> <p>{characker.language}</p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Skin colors:</strong></p> <p>{characker.skin_colors}</p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Hair colors:</strong></p> <p>{characker.hair_colors}</p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Eye colors:</strong></p> <p>{characker.eye_colors}</p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Average lifespan:</strong></p> <p>{characker.average_lifespan}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Species;