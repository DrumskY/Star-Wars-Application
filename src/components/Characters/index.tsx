/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./style.css"
import { PeopleTypes, SimpleCharacters } from './types';

const People =() => {
    const [optionApi, setOptionApi] = useState<PeopleTypes | null>(null);
    const [people, setPeople] = useState<SimpleCharacters[] | null>(null);
    const [changePage, setChangePage] = useState(1);
    let imageNumber = 1;
    let changePageImageNumber = imageNumber = (changePage - 1) * 10 

    const nextPage = () => {
        setChangePage(changePage + 1);
    }

    const previousPage = () => {
        setChangePage(changePage - 1);
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<PeopleTypes>(`https://swapi.dev/api/people/?page=${changePage}`);
                const results = response.data;
                setOptionApi(results);
                setPeople(results.results);
              } catch (error) {
                console.error(error);
              }
        };
        fetchData();
    }, [changePage]);

    if(people === null) {
        return(
            <div className="d-flex justify-content-center align-items-center">Loading data...</div>
        )
    }

    console.log(people)

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
                {people.map(characker => (
                    <div key={characker.name} className='d-flex flex-column m-5 align-items-center'>
                        <h2>{characker.name}</h2>                        
                        <img 
                            className='people-image'
                            src={require(`../../assets/characters/${String(changePage === 1 ? imageNumber++ : changePageImageNumber++)}.jpg`)} 
                        />
                        <div className='d-flex flex-column'>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Height:</strong></p> <p>{characker.height}</p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Mass:</strong></p> <p>{characker.mass}</p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Hair color:</strong></p> <p>{characker.hair_color}</p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Skin color:</strong></p> <p>{characker.skin_color}</p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Eye color:</strong></p> <p>{characker.eye_color}</p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Birth year:</strong></p> <p>{characker.birth_year}</p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p><strong>Gender:</strong></p> <p>{characker.gender}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default People;