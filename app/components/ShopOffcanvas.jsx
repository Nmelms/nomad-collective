"use client";
import React, { FormEventHandler, useState, useEffect, useRef } from "react";
import { Accordion } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import useUserStore from "../useUserStore";
import Form from "react-bootstrap/Form";
import { supabase } from "../lib/supabaseClient";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationCrosshairs,
  faCheck,
  faX,
} from "@fortawesome/free-solid-svg-icons";

function ShopOffcanvas() {
  const supabase = createClientComponentClient();
  const { showOffcanvas, setShowOffcanvas } = useUserStore();
  const [imageURLS, setImageURLS] = useState([]);
  const [show, setShow] = useState(showOffcanvas);
  const [user, setUser] = useState(null);
  const [userLocation, setUserLocation] = useState([]);
  const [locationIcon, setLocationIcon] = useState(faLocationCrosshairs);
  const crosshairRef = useRef(null);
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

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    const form = e.target;
    if (type === "address") {
      const formData = {
        name: form.InputName.value,
        street: form.street.value,
        city: form.city.value,
        state: form.state.value,
        zip: form.zip.value,
        description: form.details.value,
        imageURLS: imageURLS,
        contributor: user,
      };

      fetch("/api/shop-data", {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then(() => setShowOffcanvas(false))
        .catch((error) => console.log(error, "iin off canvas"));
    } else if (type === "location") {
      const formData = {
        name: form.InputName.value,
        lat: userLocation[0],
        lng: userLocation[1],
        description: form.details.value,
        contributor: user,
      };
      fetch("/api/add-by-location", {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then(() => setShowOffcanvas(false))
        .catch((error) => console.log(error, "iin off canvas"));
    }
  };

  useEffect(() => {
    console.log(userLocation);
  }, [userLocation]);

  return (
    <Offcanvas show={showOffcanvas} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add A Location</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Accordion>
          {/* add by address */}
          <Accordion.Item eventKey="0">
            <Accordion.Header>Add by address</Accordion.Header>
            <Accordion.Body>
              <Form onSubmit={(e) => handleSubmit(e, "address")}>
                <Form.Group className="mb-3" controlId="InputName">
                  <Form.Control type="text" placeholder="Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="street">
                  <Form.Control type="text" placeholder="Street address" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="city">
                  <Form.Control type="text" placeholder="City" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="state">
                  <Form.Control type="text" placeholder="State" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="zip">
                  <Form.Control type="text" placeholder="Zip code" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="image">
                  <Form.Label>
                    Location images.
                    <br /> Feel free to upload multiple images
                  </Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleImageChange}
                    multiple
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="details">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter details"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
          {/* add by location */}
          <Accordion.Item>
            <Accordion.Header>Add by Current Location</Accordion.Header>
            <Accordion.Body>
              <Form onSubmit={(e) => handleSubmit(e, "location")}>
                <Form.Group className="mb-3" controlId="InputName">
                  <Form.Control type="text" placeholder="Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="details">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter details"
                  />
                </Form.Group>
                <div className="use-location-wrapper">
                  <p className="m-0"> Use My current location</p>
                  <div className="location-button">
                    <FontAwesomeIcon
                      ref={crosshairRef}
                      className="location-crosshair"
                      onClick={handleLocationClick}
                      variant="primary"
                      type="button"
                      icon={locationIcon}
                    />
                  </div>
                </div>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ShopOffcanvas;
function checkUser() {
  throw new Error("Function not implemented.");
}
