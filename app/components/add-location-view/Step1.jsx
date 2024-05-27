import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import useLocationStore from "../../useLocationStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import useUserStore from "../../useUserStore";
import { map } from "../../lib/initMap";
import mapboxgl from "mapbox-gl";
import {
  faLocationCrosshairs,
  faCheck,
  faX,
  faMap,
} from "@fortawesome/free-solid-svg-icons";

const Step1 = () => {
  const {
    name,
    setName,
    lat,
    lng,
    setLat,
    setLng,
    setCoords,
    spotLocation,
    setSpotLocation,
  } = useLocationStore();
  const crosshairRef = useRef(null);
  const [locationIcon, setLocationIcon] = useState(faLocationCrosshairs);
  const { showOffcanvas, setShowOffcanvas } = useUserStore();

  const handleFindOnMapClick = () => {
    setShowOffcanvas(false);
    const handleCoordMapClick = () => {
      let currentMarker;
      map.on("click", (event) => {
        const coordinates = [event.lngLat.lng, event.lngLat.lat];

        if (currentMarker) {
          currentMarker.remove();
        }
        currentMarker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);

        setLat(event.lngLat.lat);
        setLng(event.lngLat.lng);
        setTimeout(() => {
          setShowOffcanvas(true);
        }, 750);
      });
    };

    document
      .querySelector("#map")
      .addEventListener("click", handleCoordMapClick);
    handleCoordMapClick();
  };

  const handleLocationClick = (e) => {
    e.preventDefault();
    console.log("click");
    crosshairRef.current.classList.add("spin");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        crosshairRef.current.classList.remove("spin");
        setLocationIcon(faCheck);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      },
      (error) => {
        setLocationIcon(faX);
        crosshairRef.current.classList.remove("spin");
      }
    );
  };

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      let files = Array.from(e.target.files);
      let url = await uploadImages(files);
    }
  };
  return (
    <Form
      className="d-flex flex-column justify-content-center align-items-center"
      onSubmit={(e) => handleSubmit(e, "address")}
    >
      <Form.Group className="mb-3" controlId="InputName">
        <Form.Label>Spot Name</Form.Label>
        <Form.Control
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder=""
        />
      </Form.Group>

      <Form.Group className="mb-3 " controlId="formLocation">
        <Form.Label>Location Coordinates</Form.Label>
        <div className="d-flex">
          <Form.Control
            className="m-2"
            type="text"
            placeholder="Latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
          <Form.Control
            className="m-2"
            type="text"
            placeholder="Longitude"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          />
        </div>
      </Form.Group>
      <div className="d-flex justify-content-center">
        <p>OR</p>
      </div>

      <div
        onClick={handleFindOnMapClick}
        className="find-on-map d-flex align-items-center"
      >
        <FontAwesomeIcon
          className="ps-4"
          variant="primary"
          size="2x"
          icon={faMap}
        />
        <p className="m-0 ps-3">Find on map</p>
      </div>

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
      <Form.Group className="mb-3" controlId="image">
        <Form.Label>
          Location images.
          <br /> Feel free to upload multiple images
        </Form.Label>
        <Form.Control type="file" onChange={handleImageChange} multiple />
      </Form.Group>
      <Form.Group className="mb-3" controlId="details">
        <Form.Control as="textarea" rows={3} placeholder="Enter details" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Step1;
