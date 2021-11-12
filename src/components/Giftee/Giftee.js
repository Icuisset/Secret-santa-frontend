import React from "react";

export default function Giftee({ giftee, selectedName }) {
  return (
    <div>
      {giftee && selectedName ? (
        <p>
          {selectedName}, your giftee name is : {giftee.name}
        </p>
      ) : null}
    </div>
  );
}
