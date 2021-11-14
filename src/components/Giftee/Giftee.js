import React from "react";
import { useRef, useEffect } from "react";
import "./Giftee.css";
import { gsap } from "gsap";

export default function Giftee({ giftee, selectedName }) {
  const nameRef = useRef();
  const avatarRef = useRef();
  const messageRef = useRef();
  const detailRef = useRef();
  const tl = useRef();

  useEffect(() => {
    tl.current = gsap
      .timeline()
      .to(nameRef.current, {
        rotation: 360,
        duration: 1,
        ease: "elastic",
      })
      .from(avatarRef.current, {
        opacity: 0,
        scale: 0,
        duration: 1,
      })
      .from(messageRef.current, {
        opacity: 0,
        y: 500,
      })
      .from(detailRef.current, {
        opacity: 0,
        y: 500,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='giftee-zone'>
      {giftee && selectedName ? (
        <div>
          <p className='giftee-message'>{selectedName}, your giftee name is</p>
          <p className='giftee-name' ref={nameRef}>
            {giftee.name}
          </p>
          <img
            src={giftee.avatar}
            alt='giftee avatar'
            width='200'
            ref={avatarRef}
          />
          <p className='giftee-message' ref={messageRef}>
            And here is a personal message <br />
            to you:
          </p>
          <div ref={detailRef}>
            <p className='giftee-santa giftee-text'>Dear Santa,</p>
            <p className='giftee-message giftee-text'>{giftee.message}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
