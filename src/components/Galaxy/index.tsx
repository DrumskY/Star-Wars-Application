import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { GalaxyMapType, SimplePlanet } from "./type";

const GalaxyMap =() => {
    const [planets, setPlanets] = useState<SimplePlanet[] | null>(null);
    const [changePage, setChangePage] = useState(1);
    // const canvasRef = useRef<HTMLCanvasElement>(null);

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

    if(planets === null) {
        return(
            <div>Loading data...</div>
        )
    }

    console.log(planets)

    // useEffect(() => {
    //     const canvas = canvasRef.current;
    //     if (!canvas) return;
    
    //     const scene = new THREE.Scene();
    //     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    //     const renderer = new THREE.WebGLRenderer({ canvas });
    
    //     const geometry = new THREE.SphereGeometry(1, 32, 32);
    //     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    //     const sphere = new THREE.Mesh(geometry, material);
    
    //     scene.add(sphere);
    //     camera.position.z = 5;
    
    //     const animate = () => {
    //       requestAnimationFrame(animate);
    
    //       sphere.rotation.x += 0.01;
    //       sphere.rotation.y += 0.01;
    
    //       renderer.render(scene, camera);
    //     };
    
    //     animate();
    //   }, []);

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     const light = new THREE.PointLight(0xffffff, 1, 100);
//     light.position.set(0, 0, 0);
//     scene.add(light);

//     const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
//     const materials = planets.map((planet) => {
//         const texture = new THREE.TextureLoader().load(planet.climate);
//         const material = new THREE.MeshBasicMaterial({ map: texture });
//         return material;
//     });

//     const meshes = materials.map((material, i) => {
//         const mesh = new THREE.Mesh(sphereGeometry, material);
//         mesh.position.set(Math.random() * 10, Math.random() * 10, Math.random() * 10);
//         return mesh;
//     });

//     meshes.forEach((mesh) => {
//         scene.add(mesh);
//     });

//     camera.position.z = 5;

//   // Animacja renderowania sceny
//   const animate = () => {
//     requestAnimationFrame(animate);
//     meshes.forEach((mesh) => {
//       mesh.rotation.x += 0.01;
//       mesh.rotation.y += 0.01;
//     });
//     renderer.render(scene, camera);
//   };
//   animate();

      return (
        <div className="App">
        <div>
          {planets.map((planet) => (
            <div key={planet.name}>{planet.name}</div>
          ))}
        </div>

        {/* <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} /> */}

      </div>
      );
}

export default GalaxyMap;