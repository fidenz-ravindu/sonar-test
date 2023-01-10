import { Component } from "react";

import ComponentStyles from "../../styles/Component.module.css";
import ProjectStyles from "../../styles/Project.module.css";
import Styles from "../../styles/People.module.css";
import { LeagueSpartan, MaterialIcons } from "../font";

export default class Person extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { person } = this.props;

        return <>
            <div className={[Styles.person, ProjectStyles.loading, ComponentStyles.center, ComponentStyles.relative].join(" ")} onLoad={(e) => {
                console.log(e)
                e.target.parentNode.classList.remove(ProjectStyles.loading);
                e.target.style.opacity = "1";
            }}
            >
                <img className={Styles.pic} style={{ opacity: '0' }} src={person.pic} />
                <div className={[Styles.content, ComponentStyles.center, ComponentStyles.absolute].join(" ")}>
                    <div className={[LeagueSpartan.className, Styles.name].join(" ")} >{person.name}</div>
                    <a className={[MaterialIcons.className, Styles.link].join(" ")} href={person.link} >
                        <svg viewBox="0 0 48 48" className={Styles.linkLogo}>
                            <path d="m24 31.3 7.3-7.3-7.3-7.3-2.1 2.1 3.7 3.7h-9.1v3h9.1l-3.7 3.7ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" />
                        </svg>
                    </a>
                </div>
            </div>
        </>;
    }
}
