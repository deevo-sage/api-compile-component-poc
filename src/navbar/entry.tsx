import { createRoot } from "react-dom/client";
import Link from "next/link";

function Navbar() {
  return (
    <div style={{ height: "100vh", width: "100vw", backgroundColor: "red" }}>
      <Link href="/home" style={{ color: "white", backgroundColor: "black" }}>
        Home
      </Link>
    </div>
  );
}
createRoot(document.getElementById("nav-root")!).render(<Navbar />);
