import React from "react";
import { useRef, useEffect } from "react";
import "./Giftee.css";
import { gsap } from "gsap";

export default function Giftee({ giftee, selectedName }) {
  const nameRef = useRef();

  useEffect(() => {
    gsap.to(nameRef.current, {
      rotation: "+=360",
      duration: 1,
      ease: "elastic",
    });
  }, []);

  return (
    <div className='giftee-zone'>
      {giftee && selectedName ? (
        <div>
          <p className='giftee-message'>{selectedName}, your giftee name is</p>
          <p className='giftee-name' ref={nameRef}>
            {giftee.name}
          </p>
        </div>
      ) : null}
    </div>
  );
}
