import {
  Stack,
  Button,
  InputGroup,
  FormControl,
  Card,
  Image,
  Form,
} from "react-bootstrap";
import { API, setAuthToken } from "../config/api";
import imageProfile from "../images/profile2.png";
import bm1 from "../images/bm-1.png";
import { Editor, EditorState } from "draft-js";
// import { Editor, EditorState } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from "react";

export default function NewJourney() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  return (
    <div
      className="container px-0 py-5"
      style={{ backgroundColor: "#ececec", height: "100vh" }}
    >
      <div className="container row mx-auto mb-5 fw-bold">
        <p className="" style={{ fontSize: "2.5rem" }}>
          New Journey
        </p>
      </div>
      <div className="container row mx-auto mb-3" style={{ width: "68rem" }}>
        {/* <Form handleSubmit=""> */}
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onChange={setEditorState}
        />
        <div>
          <button
            className="btn-blue fw-bold"
            variant=""
            type="submit"
            style={{
              borderRadius: "0.3rem",
            }}
          >
            Post
          </button>
        </div>
        {/* </Form> */}
      </div>
    </div>
  );
}
