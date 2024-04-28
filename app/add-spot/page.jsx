"use client";
import React, { FormEventHandler, useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationCrosshairs,
  faCheck,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { Form, Button } from "react-bootstrap";

const AddSpotPage = () => {
  const [locationIcon, setLocationIcon] = useState(faLocationCrosshairs);
  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);
  const crosshairRef = useRef(null);

  const handleLocationClick = (e) => {
    e.preventDefault();
    console.log("click");
    crosshairRef.current.classList.add("spin");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        crosshairRef.current.classList.remove("spin");
        setLocationIcon(faCheck);
        setUserLat(position.coords.latitude);
        setUserLng(position.coords.longitude);
      },
      (error) => {
        setLocationIcon(faX);
        crosshairRef.current.classList.remove("spin");
      }
    );
  };

  return (
    <div className="add-spot-page page-on-top ">
      <div className="spot-header d-flex align-items-center">
        <h2 className="ps-5">Add A Spot</h2>
      </div>
      <form className="p-3 container" action="">
        <div className="row">
          <div className="col-12">
            <div className="input-wrapper d-flex flex-column mt-5">
              <input
                name="spot-name"
                className="styled-input"
                type="text"
                required
              />
              <label className="input-label" htmlFor="spot-name">
                Spot Name
              </label>
            </div>
          </div>
        </div>
        <div className="row ">
          <h3>Add coordinates</h3>
          <div className="col-6">
            <div className="input-wrapper d-flex flex-column mt-5">
              <input
                value={userLat}
                onChange={(e) => setUserLat(e.target.value)}
                name="spot-name"
                className="styled-input"
                type="text"
                required
              />
              <label className="input-label" htmlFor="spot-name">
                lat
              </label>
            </div>
          </div>
          <div className="col-6">
            <div className="input-wrapper d-flex flex-column mt-5">
              <input
                value={userLng}
                onChange={(e) => setUserLng(e.target.value)}
                name="spot-name"
                className="styled-input"
                type="text"
                required
              />
              <label className="input-label" htmlFor="spot-name">
                Lng
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <button
              onClick={(e) => handleLocationClick(e)}
              type="button"
              className="location-button"
            >
              Use Current Location
              <FontAwesomeIcon
                ref={crosshairRef}
                className="location-crosshair"
                variant="primary"
                type="button"
                icon={locationIcon}
              />
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <button
              onClick={(e) => handleLocationClick(e)}
              type="button"
              className="location-button"
            >
              Find On Map
              <FontAwesomeIcon
                ref={crosshairRef}
                className="location-crosshair"
                variant="primary"
                type="button"
                icon={locationIcon}
              />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddSpotPage;
