import Footer from "../../container/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Nav, Navbar } from "reactstrap";
import Menu3 from "../../container/Menu3";
import {
  useLoaderData,
  Outlet,
  useNavigation,
} from "react-router-dom";
import './style.css';
import { useState } from "react";

export async function loader({ params }) {
  return params;
}

export default function RenderPage(props) {
  const navigation = useNavigation();
  const { userId } = useLoaderData();
  const {user, signOut} = props;

  return (
    <div id="template">
      <Menu3 user={user} signOut={signOut}/>
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
