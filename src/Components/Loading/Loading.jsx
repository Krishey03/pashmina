import React from "react";
import { Mosaic } from "react-loading-indicators";

export default function App() {
  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Mosaic color="#327873" size="medium" text="Loading..." textColor="#327873" />
    </div>
  );
}
