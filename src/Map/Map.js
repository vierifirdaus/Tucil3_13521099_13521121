import { Skeleton } from "@chakra-ui/react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
  });

  const center = { lat: -6.8911125, lng: 107.6101353 };

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  const options = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
  };

  if (!isLoaded) {
    return <Skeleton />;
  }

  return (
    <GoogleMap
      center={center}
      zoom={17}
      mapContainerStyle={mapContainerStyle}
      options={options}
    >
      {/* <Marker position={center} /> */}
    </GoogleMap>
  );
}

export default Map;
