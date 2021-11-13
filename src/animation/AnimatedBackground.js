import Lottie from "react-lottie";
import animationData from "../images/animation.json";

function AnimatedBackground() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return <Lottie options={defaultOptions} />;
}

export default AnimatedBackground;
