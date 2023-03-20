import React from 'react'
import { Link } from 'react-router-dom';
import "./style.css"

const Header =() => {

    return (
        <>
            <div className="container-fluid">
                <h1 className="text-center mt-3">Star Wars App</h1>
                <sup className="d-flex justify-content-center" style={{ color: "#ffc107" }}>by DrumskY</sup>
            </div>
            <div className="menu-custom d-flex justify-content-around flex-row flex-wrap">
                <div className="a"><Link to={"/"}><h4>Planets</h4></Link></div>
                <div><Link to={"/films"}><h4>Films</h4></Link></div>
                <div><Link to={"/starships"}><h4>Starships</h4></Link></div>
                <div><Link to={"/vehicles"}><h4>Vehicles</h4></Link></div>
                <div><Link to={"/people"}><h4>People</h4></Link></div>
                <div><Link to={"/species"}><h4>Species</h4></Link></div>
            </div>
        </>
    )
}

export default Header;