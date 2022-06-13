import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import "../styles/scss/d3/areaChart.scss";
import "../styles/scss/d3/barChart.scss";
import "../styles/scss/d3/baseChart.scss";
import "../styles/scss/d3/heatMap.scss";
import "../styles/scss/d3/lineChart.scss";
import "../styles/scss/d3/pieChart.scss";
import "../styles/scss/d3/scatterChart.scss";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
