"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import mapboxgl from "mapbox-gl";
import useUserStore from "../useUserStore";
import initMap from "../lib/initMap";
import StorePopup from "./StorePopup";
import useLocationStore from "../useLocationStore";

const MapboxMap = () => {
  const {
    shopData,
    setShopData,
    setIsMapSet,
    isMapSet,
    showPopup,
    setShowPopup,
    setPopupData,
    popupData,
  } = useUserStore();
  const { setSpotLocation, spotLocation } = useLocationStore();

  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const router = useRouter();

  const convertToGeoJSON = (data: DatabaseShopData[]) => {
    return {
      type: "FeatureCollection",
      features: data.map((shop) => ({
        type: "Feature",
        geometry: {
          type: shop.geometry_type || "Point",
          coordinates: [shop.lng, shop.lat],
        },
        properties: {
          id: shop.id,
          name: shop.name,
          street: shop.street,
          city: shop.city,
          state: shop.state,
          zip: shop.zip,
        },
      })),
    };
  };

  // useEffect(() => {
  //   const handlePopupClick = (event) => {
  //     console.log(event.target);
  //     // Check if the clicked element is your link
  //     if (event.target.matches(".map-popup-link")) {
  //       event.preventDefault();
  //       console.log("prevent");
  //       const href = event.target.getAttribute("href");
  //       router.push(href);
  //     }
  //   };

  //   // Attach the event listener to the whole document
  //   document.addEventListener("click", handlePopupClick);

  //   // Clean up the event listener
  //   return () => {
  //     document.removeEventListener("click", handlePopupClick);
  //   };
  // }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      if (!shopData) {
        try {
          let res = await fetch("/api/shop-data", { method: "GET" });
          if (res.ok) {
            let data: DatabaseShopData[] = await res.json();
            setShopData(convertToGeoJSON(data));
          } else {
            console.log(res, "Error fetching shop data");
          }
        } catch (error) {
          console.error("Error in map.jsx:", error);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (shopData && !mapRef.current) {
      initMap(
        shopData,
        isMapSet,
        setIsMapSet,
        router,
        setShowPopup,
        showPopup,
        setPopupData,
        setSpotLocation
      );
    }
  }, [shopData]);

  useEffect(() => {
    console.log("spot location:", spotLocation);
  }, [spotLocation]);

  return (
    <div id="map" style={{ height: "90dvh" }}>
      <div className="popup-wrapper">
        {showPopup && <StorePopup popupData={popupData} />}
      </div>
    </div>
  );
};

export default MapboxMap;
