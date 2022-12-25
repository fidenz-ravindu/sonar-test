import { Component } from "react";
import ComponentStyles from '../../styles/Component.module.css'
import Styles from '../../styles/Position.module.css'
import { Cabin, Catamaran, Fredoka, Hubbali, Lato, MaterialIcons, Nunito, SourceSansPro } from "../font";

export default class Position extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
        };

        this.months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dev",
        ];
    }

    render() {
        const { style, work } = this.props,
            { expanded, row } = this.state;

        let started = new Date(work.started), end = new Date(work.end);
        if (end.getTime() < started.getTime()) {
            end = 'Present';
        } else {
            end = `${this.months[end.getMonth()]} ${end.getFullYear()}`
        }
        started = `${this.months[started.getMonth()]} ${started.getFullYear()}`

        return <>
            <div className={[ComponentStyles.fadeIn, Styles.container].join(" ")} style={{ color: "white", ...style }}>
                <div className={[ComponentStyles.row, ComponentStyles.center].join(" ")}>
                    <div className={[Styles.logoContainer].join(" ")}>
                        <img className={Styles.logo} src={work.logo} atl="logo" />
                    </div>
                    <div className={[ComponentStyles.row].join(" ")}>
                        <div className={[Styles.title, SourceSansPro.className].join(" ")}>{work.name}</div>
                        <div className={[ComponentStyles.center, ComponentStyles.spaceBet, Cabin.className].join(" ")} style={{ color: "grey", fontSize: "0.8rem" }}>
                            <div>{work.position}</div>
                            <div>{started + " - " + end}</div>
                        </div>
                    </div>
                </div>
                <div className={ComponentStyles.row}>
                    <span className={[MaterialIcons.className, Styles.expandMore, (expanded ? Styles.expanded : "")].join(" ")}
                        onClick={() => {
                            this.setState({ expanded: !expanded });
                        }}>expand_more</span>
                </div>
                <div style={{ height: "fit-content", margin: "0", maxHeight: (expanded ? "100vh" : "0"), overflow: "hidden" }}>
                    <div className={[Styles.remarks, Nunito.className].join(" ")}>{work.remarks}</div>
                    <ul className={[Styles.list, Hubbali.className].join(" ")}>{
                        work.responsibilities.map(elm => <li className={[Styles.listItem, ComponentStyles.center, ComponentStyles.justifyStart, ComponentStyles.alignStart].join(" ")} key={Math.random()}>{elm}</li>)
                    }</ul>
                </div>
            </div>
        </>;
    }
}
