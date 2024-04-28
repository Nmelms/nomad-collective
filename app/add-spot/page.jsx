"use client";
import React from "react";
import { Form, Button } from "react-bootstrap";

const AddSpotPage = () => {
  return (
    <div className="add-spot-page page-on-top">
      <div className="spot-header d-flex align-items-center">
        <h2 className="ps-5">Add A Spot</h2>
      </div>
      <form className="p-3" action="">
        <div className="input-wrapper d-flex flex-column mt-5">
          <input
            name="spot-name"
            className="styled-input"
            type="text"
            required
          />
          <label className="input-label" htmlFor="spot-name">
            Spot Name
          </label>
        </div>
      </form>
    </div>
  );
};

export default AddSpotPage;
