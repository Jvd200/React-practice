import React from "react";

function ItemList({ items }) {
  return (
    <div>
      {items.length == 0 ? (
        <p>No match</p>
      ) : (
        items.map((ind, item) => <p key={ind}>{item}</p>)
      )}

      <p></p>
    </div>
  );
}

export default ItemList;
