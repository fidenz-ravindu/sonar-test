import Link from "next/link";
import ComponentStyles from "../../styles/Component.module.css";
import Styles from "../../styles/Navbar.module.css";

export default function NavLink(props) {
  const { className, href, current, ...rest } = props;

  return (
    <div
      className={[
        ComponentStyles.center,
        ComponentStyles.relative,
        Styles.navLink,
        ComponentStyles.column,
      ].join(" ")}
    >
      <Link
        {...rest}
        href={href}
        className={className + (href === current ? " " + Styles.active : "")}
      ></Link>
      <span
        className={[ComponentStyles.absolute, Styles.linkHover].join(" ")}
        {...rest}
      ></span>
      <span className={Styles.linkModifier}></span>
    </div>
  );
}
