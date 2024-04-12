import { Container } from "@mui/material";

import CountdownText from "../../components/CountdownText/CountdownText";
import CountdownVideo from "../../components/CountdownVideo/CountdownVideo";
import { MapView } from "../../components/MapView/MapView";

function About() {
  return (
    <Container sx={{ py: 15 }} maxWidth="md">
      <CountdownText />
      <CountdownVideo />
      <MapView />
    </Container>
  );
}

export default About;
