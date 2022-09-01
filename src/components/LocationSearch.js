import React, { useContext, useRef } from "react";
import { Form } from "react-bootstrap";
import { CityContext } from "./CityContext";

export default function LocationSearch() {
  const { setCityName } = useContext(CityContext);
  const nameRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setCityName(nameRef.current.value);
    event.target.reset();
  };

  return (
    <div className="container mb-4" style={{ color: "white" }}>
      <h1>Weather</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          placeholder="Search for a city"
          size="sm"
          type="text"
          ref={nameRef}
        />
      </Form>
    </div>
  );
}
