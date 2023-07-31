import React, { useContext, useEffect, useState } from "react";
import MemberData from "./MemberData";
import GoogleMap from "./GoogleMap";
import AppContext from "../AppContext";

export default function Subordinates() {
  const { statusList, statusTypeList, setRenderList, userId, renderList } = useContext(AppContext);
  const [rawSubordinatesList, setRawSubordinatesList] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/member/${userId}/subordinates`)
      .then((res) => res.json())
      .then((data) => {
        setRawSubordinatesList(data.subordinates);
      });
  }, [userId]);

  useEffect(() => {
    if (rawSubordinatesList.length > 0 && statusList.length > 0) {
      // Merge data and set renderList
      const mergedData = rawSubordinatesList.map((member) => {
        const status = statusList.find((stat) => stat.id === member.status_id);
        if (status) {
          return {
            ...member,
            address: status.address,
            status: status.type,
          };
        } else {
          return member;
        }
      });
      setRenderList(mergedData);
    }
  }, [rawSubordinatesList, statusList, statusTypeList, setRenderList]);

console.log(renderList)

  return (
    <main>
      <GoogleMap subordinatesList={rawSubordinatesList} />
      <MemberData />
    </main>
  );
}
