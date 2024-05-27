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

  async function uploadImages(files) {
    console.log(typeof files, files);
    console.log(typeof files, "these are the files");

    const uploadPromises = files.map((file) => {
      console.log(file);
      return supabase.storage
        .from("coffee-shop-images")
        .upload(`${file.name}`, file, {
          cacheControl: "3600",
          upsert: false,
        });
    });

    const results = await Promise.all(uploadPromises);
    console.log(results, "thsse are the resutls");

    const uploadResponses = [];
    results.map((result) => uploadResponses.push(result.data.fullPath));
    setImageURLS(uploadResponses);
  }
  useEffect(() => {
    console.log(imageURLS);
  }, [imageURLS]);

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      let files = Array.from(e.target.files);
      let url = await uploadImages(files);
    }
  };

  useEffect(() => {
    console.log(userLocation);
  }, [userLocation]);

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
