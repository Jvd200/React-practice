import React from "react";

function SearchBox({ value, setItm }) {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setItm(e.target.value)}
      />
    </div>
  );
}

export default SearchBox;
