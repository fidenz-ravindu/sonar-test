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
        <div className={[Styles.navbarControllerContainer, ComponentStyles.relative, ComponentStyles.center].join(" ")}>
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
            <a href={"/CV.pdf"} className={[
              ComponentStyles.btn,
              ComponentStyles.center,
              Nunito.className,
              Styles.navButton
            ].join(" ")}>
              <svg className={Styles.buttonSVG} viewBox="0 0 48 48" fill="white">
                <path d="M11 40q-1.2 0-2.1-.9Q8 38.2 8 37v-7.15h3V37h26v-7.15h3V37q0 1.2-.9 2.1-.9.9-2.1.9Zm13-7.65-9.65-9.65 2.15-2.15 6 6V8h3v18.55l6-6 2.15 2.15Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </a>
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
