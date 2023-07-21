import React from 'react'
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// Initialize and add the map

const GoogleMap = () => {

let map;

async function initMap() {
  // The location of CONUS
  //39.8283° N, 98.5795° W
  const center = { lat: 39.8283, lng: -98.5795 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: center,
    mapId: "DEMO_MAP_ID",
  });
  
  geocoder = new google.maps.Geocoder();

const codeAddress = (address) => {

    geocoder.geocode( { 'address' : address }, function( results, status ) {
        if( status == google.maps.GeocoderStatus.OK ) {

            //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
            map.setCenter( results[0].geometry.location );
            var marker = new google.maps.Marker( {
                map     : map,
                position: results[0].geometry.location
            } );
        } else {
            alert( 'Geocode was not successful for the following reason: ' + status );
        }
    } );
}
  // The marker, positioned at Uluru
const marker = new AdvancedMarkerElement({
    map: map,
    position: {lat: 39.6974, lng: -104.7697},
    title: "Buckley",
  });
  const marker2 = new AdvancedMarkerElement({
    map: map,
    position: {lat: 39.69, lng: -114.76},
    title: "Marker2",
  });
    codeAddress('18824 E Baltic Place, Aurora, CO 80013')
    codeAddress('El Paso, TX')
    codeAddress('Vandenberg SFB')
    codeAddress('Doha, Qatar')
    codeAddress('South Korea')
}

initMap();

return (
    <main>
        <head>
        <title>Add Map</title>
        <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
        {/* <!-- jsFiddle will insert css and js --> */}
        </head>
        <body>
        <h3>My Google Maps Demo</h3>
        {/* <!--The div element for the map --> */}
        <div id="map"></div>

        {/* <!-- prettier-ignore --> */}
            <div>
            {(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
            ({key: "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg", v: "beta"})};
            </div>
        </body>
    </main>
)

}

export default GoogleMap
