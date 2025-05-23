import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/SyncLoader";

// const override = {
//   display: "block",
//   margin: "0 auto",
//   borderColor: "red",
// };

function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#bfbfbf");

  return (
    <div className="sweet-loading">
      <button onClick={() => setLoading(!loading)}>Toggle Loader</button>
      <input value={color} onChange={(input) => setColor(input.target.value)} placeholder="Color of the loader" />

      <ClipLoader
        color={color}
        loading={loading}
        // cssOverride={override}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader;