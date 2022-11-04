import React from 'react'
import { ThreeCircles } from "react-loader-spinner";
const Loader = () => {
  return (
    <div>
        <div
      style={{ display: "flex", justifyContent: "center", alignItems: "center"}}
    >
      <ThreeCircles
        height="100"
        width="100"
        color="grey"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
    </div>
  )
}

export default Loader