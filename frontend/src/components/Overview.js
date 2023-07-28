import React, { useState, useEffect, useRef, useContext } from "react";
import GoogleMapReact from "google-map-react";
import MemberData from "./MemberData";
import GoogleMap from "./GoogleMap";
import dotenv from 'dotenv';
import loadjs from "loadjs";
import AppContext from "../AppContext";

export default function Overview() {
  const [apiKey, setApiKey] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const mapRef = useRef(null);
  const defaultZoom = 4.5;
  const markers = useRef([]);

  const [isLoading, setIsLoading] = useState(true);

  const {
    mergedList,
    setMergedList,
    renderList,
    setRenderList,
  } = useContext(AppContext);

  console.log(mergedList);
  useEffect(() => {
    setRenderList(mergedList)
  }, []);


  return (
    <main>
      <GoogleMap />
      <MemberData />
    </main>
  );
}