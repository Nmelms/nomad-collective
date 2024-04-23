"use client";
import React from "react";
import { Carousel, CarouselItem } from "react-bootstrap";
import Image from "next/image";

const LocationCarousel = ({ imageURLs }) => {
  return (
    <Carousel>
      {imageURLs.map((imageURL, index) => (
        <Carousel.Item key={index}>
          <Image
            src={`https://xlvjgjhetfrtaigrimtd.supabase.co/storage/v1/object/public/${imageURL}`}
            alt={`Slide ${index + 1}`}
            height={500}
            width={500}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default LocationCarousel;
