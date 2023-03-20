/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FilmsTypes, SimpleFilm } from './types';
import "./style.css"

const Films =() => {
    const [films, setFilms] = useState<SimpleFilm[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<FilmsTypes>(`https://swapi.dev/api/films/`);
                const results = response.data.results;
                setFilms(results);
              } catch (error) {
                console.error(error);
              }
        };
        fetchData();
    }, []);

    if(films === null) {
        return(
            <div className="d-flex justify-content-center align-items-center">Loading data...</div>
        )
    }

    console.log(films)

    return (
        <div className='d-flex flex-row justify-content-center flex-wrap m-3'>
            {films.map((film, index) => (
                <div key={film.title} className=' d-flex flex-column m-5 align-items-center'>
                    <h2>{film.title}</h2>                        
                    <img 
                        className='films-image'
                        src={require(`../../assets/films/${String(1 + index++)}.jpg`)} 
                    />
                    <div className='d-flex flex-column films-contener'>
                        <div className='d-flex flex-row justify-content-between'>
                            <p><strong>Episode:</strong></p> <p>{film.episode_id}</p>
                        </div>
                        <div className='d-flex flex-row justify-content-between'>
                            <p><strong>Director:</strong></p> <p>{film.director}</p>
                        </div>
                        <div className='d-flex flex-row justify-content-between'>
                            <p><strong>Producer:</strong></p> <p>{film.producer}</p>
                        </div>
                        <div className='d-flex flex-row justify-content-between'>
                            <p>{film.opening_crawl}</p>
                        </div>
                    </div>
                </div>
            ))} 
        </div>
    )
}

export default Films;