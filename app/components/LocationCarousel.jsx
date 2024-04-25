"use client";
import React, { useEffect, useState } from "react";
import noImage from "../../public/no-image.webp";
import { Carousel, CarouselItem } from "react-bootstrap";
import Image from "next/image";

const LocationCarousel = ({ imageURLs }) => {
  const [indicators, setIndicators] = useState(false);
  useEffect(() => {
    imageURLs.length > 0 ? setIndicators(true) : setIndicators(false);
  }, [imageURLs]);

  return (
    <Carousel
      indicators={indicators}
      interval={null}
      className="location-carousel"
    >
      {imageURLs.length < 1 && (
        <Carousel.Item>
          <Image
            className="carousel-image"
            src={noImage}
            alt={"no image"}
            height={300}
            width={300}
          />
        </Carousel.Item>
      )}
      {imageURLs.length > 0 &&
        imageURLs.map((imageURL, index) => (
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
