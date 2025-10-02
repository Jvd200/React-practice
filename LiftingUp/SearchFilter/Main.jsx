import React, { useState } from "react";
import SearchBox from "./SearchBox";
import ItemList from "./ItemList";

function Main() {
  const [items] = useState([
    "Daya",
    "viji",
    "vin",
    "shri",
    "sin",
    "meg",
    "man",
    "abr",
  ]);
  const [itm, setItm] = useState("");
  const filteredItem = items.filter((name) =>
    name.toLowerCase().includes(itm.trim().toLowerCase())
  );

  return (
    <div>
      <SearchBox value={itm} setItm={setItm} />
      <ItemList items={filteredItem} />
    </div>
  );
}

export default Main;
