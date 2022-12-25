import { useRouter } from "next/router";
import { Component } from "react";
import { Provider, useDispatch } from "react-redux";
import Layout from "../src/components/Layout";
import RouteProgress from "../src/components/RouteProgress";
import { store } from "../src/store";
import "../styles/globals.css";

export default function App(props) {
  return <AppComponent {...props} router={useRouter()} />;
}

class AppComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routing: false,
      progress: {
        display: "none",
        width: "0",
        transition: "0.5s ease all",
      },
    };

    this.routeStart = this.routeStart.bind(this);
    this.routeEnd = this.routeEnd.bind(this);
  }

  routeStart() {
    if (!this.props.routing)
      this.setState({
        routing: true,
        progress: { display: "block", width: "60%" },
      });
  }

  routeEnd() {
    this.setState({ progress: { display: "block", width: "100%" } });
    setTimeout(() => {
      this.setState({
        progress: { routing: false, display: "none", width: 0 },
      });
    }, 600);
  }

  componentDidMount() {
    const { router } = this.props;

    router.events.on("routeChangeStart", this.routeStart);
    router.events.on("routeChangeComplete", this.routeEnd);
    router.events.on("routeChangeError", this.routeEnd);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <RouteProgress style={this.state.progress} />
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </>
    );
  }
}
