import { Stack, Button, InputGroup, FormControl, Card } from "react-bootstrap";
import { API } from "../config/api";

export default function Bookmark() {
  return (
    <div
      className="container px-0 py-5"
      style={{ backgroundColor: "#ececec", height: "100vh" }}
    >
      <div className="container row mx-auto mb-5 fw-bold">
        <p className="" style={{ fontSize: "2.5rem" }}>
          Bookmark
        </p>
      </div>

      <div className="container row">
        <div className="col-3 m-4">
          <Card style={{ width: "18rem" }} className="shadow">
            <Card.Img variant="top" src="holder.js/100px180" />
            <span className="position-absolute top-0 end-0 p-4 bg-success rounded-circle"></span>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <p className="opacity-50" style={{ fontSize: "0.8rem" }}>
                02-10-2020
              </p>
              <Card.Text className="text-wrap text-truncate">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
