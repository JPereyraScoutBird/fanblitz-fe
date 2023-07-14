import Footer from "../../container/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";
import Menu from "../../container/Menu";
import {
  useLoaderData,
  Outlet,
  useNavigation,
} from "react-router-dom";
import './style.css';

export async function loader({ params }) {
  return params;
}

export default function RenderPage() {
  const navigation = useNavigation();
  const { userId } = useLoaderData();
  
  return (
    <div id="template">
      <Menu />
      <Container
        
        // fluid
        className="template"
      >
        <div
          id="detail"
          className={navigation.state === "loading" ? "loading" : ""}
        >
          <Outlet />
        </div>
      </Container>
      <Footer />
    </div>
  );
}
