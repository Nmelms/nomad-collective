"use client";
import React, { FormEventHandler, useState, useEffect, useRef } from "react";
import { map } from "../lib/initMap";
import mapboxgl from "mapbox-gl";
import Button from "react-bootstrap/Button";
import useLocationStore from "../useLocationStore";
import Offcanvas from "react-bootstrap/Offcanvas";
import useUserStore from "../useUserStore";
import Form from "react-bootstrap/Form";
import { supabase } from "../lib/supabaseClient";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Step1 from "./add-location-view/Step1";
import Step2 from "./add-location-view/Step2";
import {
  faLocationCrosshairs,
  faCheck,
  faX,
  faMap,
} from "@fortawesome/free-solid-svg-icons";

function ShopOffcanvas() {
  const supabase = createClientComponentClient();
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
  const [locationStep, setLocationSet] = useState("step1");
  const { showOffcanvas, setShowOffcanvas } = useUserStore();
  const [imageURLS, setImageURLS] = useState([]);
  const [show, setShow] = useState(showOffcanvas);
  const [user, setUser] = useState(null);
  const [userLocation, setUserLocation] = useState([]);

  // checks if there is a user to attribute when adding a new location
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user?.user_metadata.display_name);
    };
    checkUser();
  }, []);

  const handleClose = () => setShowOffcanvas(false);

  return (
    <Offcanvas show={showOffcanvas} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add A Spot</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {locationStep === "step1" && <Step1 />}
        {locationStep === "step2" && <Step2 />}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ShopOffcanvas;
function checkUser() {
  throw new Error("Function not implemented.");
}
