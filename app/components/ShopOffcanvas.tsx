"use client";
import React, { FormEventHandler, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import useUserStore from "../useUserStore";
import Form from "react-bootstrap/Form";
import { supabase } from "../lib/supabaseClient";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

function ShopOffcanvas() {
  const supabase = createClientComponentClient();
  const { showOffcanvas, setShowOffcanvas } = useUserStore();
  const [imageURL, setImageURL] = useState("");
  const [show, setShow] = useState(showOffcanvas);
  const [user, setUser] = useState<any | null>(null);

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

  async function uploadImage(file: File): Promise<UploadResponse> {
    const { data, error } = await supabase.storage
      .from("coffee-shop-images")
      .upload(`${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    return data as UploadResponse;
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      let url = await uploadImage(e.target.files[0]);
      setImageURL(url.fullPath);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData: ShopFormData = {
      name: form.InputName.value,
      street: form.street.value,
      city: form.city.value,
      state: form.state.value,
      zip: form.zip.value,
      description: form.details.value,
      imageURL: imageURL,
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
  };

  return (
    <Offcanvas show={showOffcanvas} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add A Shop</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
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
            <Form.Label>Shop Image</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="details">
            <Form.Control as="textarea" rows={3} placeholder="Enter details" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ShopOffcanvas;
function checkUser() {
  throw new Error("Function not implemented.");
}
