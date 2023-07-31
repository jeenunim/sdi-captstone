import React, { useContext, useEffect } from "react";
import MemberData from "./MemberData";
import GoogleMap from "./GoogleMap";
import AppContext from "../AppContext";

export default function Overview({ mergedList }) {
  const { setRenderList, renderList } = useContext(AppContext);

  useEffect(() => {
    // Set the mergedList from App.js to the renderList in Overview.js
    setRenderList(mergedList);
  }, [mergedList, setRenderList]);

  console.log('renderList: ', renderList);

  return (
    <main>
      <GoogleMap />
      <MemberData />
    </main>
  );
}
