import React, { useState, useEffect, useRef, useContext } from "react";
import MemberData from "./MemberData";
import GoogleMap from "./GoogleMap";
import AppContext from "../AppContext";

export default function Overview() {
  const {
    mergedList,
    renderList,
    setRenderList,
  } = useContext(AppContext);

  useEffect(() => {
    setRenderList(mergedList)
  }, []);

console.log('renderList: ', renderList)

  return (
    <main>
      <GoogleMap />
      <MemberData />
    </main>
  );
}