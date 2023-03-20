import axios from "axios";
import React, { useEffect, useState } from "react";
import * as THREE from 'three';
import { GalaxyMapType, SimplePlanet } from "./types";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from 'react-three-fiber';
import CustomStars from "../Stars";
import "./style.css"


const PlanetDetails = ({ planet }: { planet: SimplePlanet }) => {
  return (
    <div className="planet-details">
      <h4>{planet.name}</h4>
      <h5><strong>Rotation period:</strong> {planet.rotation_period}</h5>
      <h5><strong>Orbital period:</strong> {planet.orbital_period}</h5>
      <h5><strong>Diameter:</strong> {planet.diameter}</h5>
      <h5><strong>Climate:</strong> {planet.climate}</h5>
      <h5><strong>Gravity:</strong> {planet.gravity}</h5>
      <h5><strong>Terrain:</strong> {planet.terrain}</h5>
      <h5><strong>Surface water:</strong> {planet.surface_water}</h5>
    </div>
  );
};


const GalaxyMap =() => {
    const [planets, setPlanets] = useState<SimplePlanet[] | null>(null);
    const [changePage, setChangePage] = useState(1);

    const [selectedPlanet, setSelectedPlanet] = useState<SimplePlanet | null>(null);

    const textureLoader = new THREE.TextureLoader();
    const textures = {
      desert: textureLoader.load('./desert.png'),
      mountains: textureLoader.load('./rocky.png'),
      grasslands: textureLoader.load('./forest.png'),
      forests: textureLoader.load('./forest.png'),
      cityscape: textureLoader.load('./city.png'),
      jungle: textureLoader.load('./jungle.png'),
      tundra: textureLoader.load('./tundra.png'),
      swamp: textureLoader.load('./swamp.png'),
      gasgiant: textureLoader.load('./gasgiant.png'),
      grassyhills: textureLoader.load('./grassyhills.png'),
      ocean: textureLoader.load('./ocean.jpg'),
      rock: textureLoader.load('./rocky.png'),
      default: textureLoader.load('./swamp.png'),
    };

    const nextPage = () => {
        setChangePage(changePage + 1);
    }

    const previousPage = () => {
        setChangePage(changePage - 1);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<GalaxyMapType>(`https://swapi.dev/api/planets/?page=${changePage}`);
                const results = response.data.results;
                setPlanets(results);
              } catch (error) {
                console.error(error);
              }
        };
        fetchData();
    }, [changePage]);

    const handlePlanetClick = (planet: SimplePlanet) => {
      setSelectedPlanet(planet);
    };

    if(planets === null) {
        return(
            <div className="d-flex justify-content-center align-items-center">Loading data...</div>
        )
    }

      return (
        <>
          <div style={{ width: '95vw', height: '60vh'}}>
            {planets && (
              <Canvas>
              <OrbitControls />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <CustomStars />
                {planets.map((planet) => (
                  <mesh
                    key={planet.name}
                    position={[
                      (Math.random() - 0.5) * 500,
                      (Math.random() - 0.5) * 500,
                      (Math.random() - 0.5) * 500,
                    ]}
                    onClick={() => handlePlanetClick(planet)}
                  >
                    <sphereGeometry args={[Math.sqrt(parseInt(planet.diameter)) / 5]} />
                    <meshStandardMaterial
                      map={
                        planet.terrain.split(',')[0] === 'desert'
                          ? textures.desert
                          : planet.terrain.split(',')[0] === 'mountains'
                          ? textures.mountains
                          : planet.terrain.split(',')[0] === 'grasslands'
                          ? textures.grasslands
                          : planet.terrain.split(',')[0] === 'forests'
                          ? textures.forests
                          : planet.terrain.split(',')[0] === 'cityscape'
                          ? textures.cityscape
                          : planet.terrain.split(',')[0] === 'jungle'
                          ? textures.jungle
                          : planet.terrain.split(',')[0] === 'tundra'
                          ? textures.tundra
                          : planet.terrain.split(',')[0] === 'swamp'
                          ? textures.swamp
                          : planet.terrain.split(',')[0] === 'gas giant'
                          ? textures.gasgiant
                          : planet.terrain.split(',')[0] === 'grassy hills'
                          ? textures.grassyhills
                          : planet.terrain.split(',')[0] === 'ocean'
                          ? textures.ocean
                          : planet.terrain.split(',')[0] === 'rock'
                          ? textures.rock

                          : textures.default
                      }
                    />
                  </mesh>
                ))}
              </Canvas>
            )}
          </div>
          <div className="d-flex justify-content-around align-items-baseline my-5">
            <div onClick={previousPage}  className="btn btn-warning btn-lg btn-radius ">
              <i className="fas fa-arrow-left"></i>
            </div>
              {selectedPlanet ? <PlanetDetails planet={selectedPlanet} /> : <p>click on the planet and learn about its characteristics :D</p>}
            <div onClick={nextPage} className="btn btn-warning btn-lg btn-radius">
              <i className="fas fa-arrow-right"></i>
            </div>
          </div>
        </>
  );
}

export default GalaxyMap;