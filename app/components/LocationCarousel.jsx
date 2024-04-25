"use client";
import React from "react";
import { Carousel, CarouselItem } from "react-bootstrap";
import Image from "next/image";

const LocationCarousel = ({ imageURLs }) => {
  return (
    <Carousel interval={null} className="location-carousel">
      {imageURLs.map((imageURL, index) => (
        <Carousel.Item key={index}>
          <Image
            className="carousel-image"
            src={`https://xlvjgjhetfrtaigrimtd.supabase.co/storage/v1/object/public/${imageURL}`}
            alt={`Slide ${index + 1}`}
            height={300}
            width={300}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default LocationCarousel;
