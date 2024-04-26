import React from "react";
import { faCoffee, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "../../lib/supabaseClient";
import LocationCarousel from "../../components/LocationCarousel.jsx";

const page = async ({ params }: PageProps) => {
  let arr: any[] = [];
  async function fetchShopById(shopId: number) {
    const { data, error } = await supabase
      .from("locations")
      .select("*")
      .eq("id", shopId)
      .single();

    if (error) {
      console.log("there was an error");
      return null;
    }
    return data;
  }

  let shopData = await fetchShopById(params.id);
  let imageURLs;
  if (shopData.imageURLS) {
    imageURLs = JSON.parse(shopData.imageURLS);
  }

  return (
    <div className="coffee-shop-page d-flex flex-column ">
      <Link href="/">
        <FontAwesomeIcon
          size="2x"
          className="p-4 back-arrow"
          icon={faArrowLeft}
        />
      </Link>
      <FontAwesomeIcon size="2x" className="" icon={faCoffee} />
      <h2 className="text-center pt-4">{shopData?.name}</h2>
      <div className="store-image-wrapper">
        <LocationCarousel imageURLs={imageURLs} />
        <FontAwesomeIcon size="2x" className="heart-icon" icon={faHeart} />
      </div>
      <a
        href={`https://www.google.com/maps/?q=${shopData.lat},${shopData.lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="navigate-btn rounded-pill"
      >
        Navigate
      </a>
      <img
        className="static-store-map"
        src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+999(${shopData.lng},${shopData.lat})/${shopData.lng},${shopData.lat},15/400x400?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
        alt="Map"
      />
      {shopData.contributor && (
        <a href={`../user/${shopData.contributor}`}>
          <span>{shopData.contributor}</span>
        </a>
      )}

      <p className="description-text">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt nihil
        laudantium et facere! Dolorem excepturi nam magnam ducimus recusandae
        facere corrupti cumque culpa quas natus fugit quibusdam unde eius
        commodi sit exercitationem laudantium quia temporibus, odio aperiam at,
        non ullam.
      </p>
    </div>
  );
};

export default page;
