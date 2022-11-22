import HandShake from "../images/hand-shake.svg"
import SocialDistance from "../images/social-distance.svg"
import HandWash from "../images/hand-wash.svg"

function WhatCanWeDo() {
  return (
    <div className="flex flex-col gap-20 mt-10">
      <div className="flex flex-col sm:flex-row">
        <div className="flex flex-1 justify-center items-center">
          <h1 className="text-3xl mb-5 lg:mb-0 lg:text-9xl font-bold">
            Social Distancing
          </h1>
        </div>
        <div className="flex flex-1">
          <img src={SocialDistance} alt="" />
        </div>
      </div>
      <div className="flex flex-col-reverse sm:flex-row">
        <div className="flex flex-1">
          <img src={HandWash} alt="" />
        </div>
        <div className="flex flex-1 justify-center items-center">
          <h1 className="text-3xl mb-5 lg:mb-0 lg:text-9xl font-bold">
            Wash Hands
          </h1>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row mb-20">
        <div className="flex flex-1 justify-center items-center">
          <h1 className="text-3xl mb-5 lg:mb-0 lg:text-9xl font-bold">
            No Hand Shaking
          </h1>
        </div>
        <div className="flex flex-1">
          <img src={HandShake} alt="" />
        </div>
      </div>
    </div>
  )
}

export default WhatCanWeDo
