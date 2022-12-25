import Navbar from "./Navbar";
import ComponentStyles from "../../styles/Component.module.css";
import { useSelector } from "react-redux";

import Styles from "../../styles/Layout.module.css";

export default function Layout({ children }) {
  const isWaiting = useSelector((state) => state.waiting);

  return (
    <>
      <section
        className={[
          ComponentStyles.absolute,
          ComponentStyles.windowFill,
          Styles.background,
        ].join(" ")}
      ></section>
      <Navbar />
      <main>{children}</main>
      {isWaiting && <div className={Styles.loadingIndicator}>
        <span className={Styles.loading}></span>
        <span className={Styles.loading}></span>
        <span className={Styles.loading}></span>
        <span className={Styles.loading}></span>
        <span className={Styles.loading}></span>
      </div>}
    </>
  );
}
