import { useRouter } from "next/router";
import { Component, createRef } from "react";
import NavLink from "./NavLink";

import ComponentStyles from "../../styles/Component.module.css";
import Styles from "../../styles/Navbar.module.css";
import {
  AltonaSans,
  Barlow,
  Cabin,
  MaterialIcons,
  Lora,
  Montserrat,
  Poppins,
  Nunito,
  Roboto,
  Rubik,
  SourceSansPro,
  Atma,
  Catamaran,
  Sarabun,
  Raleway,
  DancingScript,
  Pacifico,
} from "../font";
import Link from "next/link";

export default function Navbar(props) {
  return (
    <NavbarComponent
      {...props}
      path={useRouter().asPath}
      router={useRouter()}
    />
  );
}

class NavbarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavbarVisible: false,
    };
  }

  componentDidMount() {
    const { router } = this.props;

    router.events.on("routeChangeStart", () => {
      this.setState({ isNavbarVisible: false });
    });
  }

  render() {
    const { isNavbarVisible } = this.state;

    return (
      <>
        <div
          className={[
            Styles.navbarController,
            ComponentStyles.center,
            ComponentStyles.column,
            isNavbarVisible ? " " + Styles.active : "",
          ].join(" ")}
          onClick={() => {
            this.setState({ isNavbarVisible: !isNavbarVisible });
          }}
        >
          <span className={Styles.controllerModifier}></span>
          <span className={Styles.controllerModifier}></span>
          <span className={Styles.controllerModifier}></span>
        </div>
        <section
          tabIndex={1}
          className={[
            isNavbarVisible ? " " + Styles.active : "",
            ComponentStyles.row,
            Styles.navbar,
            ComponentStyles.center,
            ComponentStyles.justifyStart,
          ].join(" ")}
        >
          <div
            className={[
              ComponentStyles.relative,
              Styles.title,
              Pacifico.className,
            ].join(" ")}
            style={{ width: "fit-content", fontSize: "1.75rem" }}
          >
            <span className={[Styles.titleDesign].join(" ")}>
              Ravindu Denuwan
            </span>
          </div>

          <div
            className={[
              Styles.navLinkContainer,
              ComponentStyles.center,
              Poppins.className,
            ].join(" ")}
          >
            <NavLink className={Styles.link} href="/" current={this.props.path}>
              Home
            </NavLink>
            <NavLink
              className={Styles.link}
              href="/work"
              current={this.props.path}
            >
              Work
            </NavLink>
            <NavLink
              className={Styles.link}
              href="/gallery"
              current={this.props.path}
            >
              Gallery
            </NavLink>
            <NavLink
              className={Styles.link}
              href="/feed"
              current={this.props.path}
            >
              Feed
            </NavLink>
            <NavLink
              className={Styles.link}
              href="/projects"
              current={this.props.path}
            >
              Projects
            </NavLink>
            <NavLink
              className={Styles.link}
              href="/archievements"
              current={this.props.path}
            >
              Archievements
            </NavLink>
            <NavLink
              className={Styles.link}
              href="/people"
              current={this.props.path}
            >
              People
            </NavLink>
          </div>

          <div className={Styles.navButtonContainer}>
            <Link
              href={"/contact"}
              className={[
                ComponentStyles.btn,
                Styles.navButton,
                Nunito.className,
              ].join(" ")}
            >
              Contact Me
            </Link>
          </div>
        </section>
      </>
    );
  }
}
