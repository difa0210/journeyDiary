import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { API } from "../config/api";

export default function NewJourney() {
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleChangeEditor = async (e, editor) => {
    const data = editor.getData();
    setForm({
      ...form,
      description: data,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store form data as object
      const formData = new FormData();
      if (form.title && form.description && form.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
        formData.set("title", form.title);
        formData.set("description", form.description);
      }

      console.log(form);

      const response = await API.post("/journey", formData, config);
      setForm({
        title: "",
        description: "",
        image: "",
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div
      className="container pt-5"
      style={{ backgroundColor: "#ececec", height: "100vh" }}
    >
      <div className="container row mx-auto mb-5 fw-bold">
        <p className="" style={{ fontSize: "2.5rem" }}>
          New Journey
        </p>
      </div>
      <div className="container row mx-auto">
        <Form onSubmit={handleSubmit} className="">
          <Form.Label className="fs-5 fw-bold ">Title</Form.Label>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Control
              className="container px-3 py-2 mb-4"
              type="text"
              name="title"
              value={form.title}
              placeholder="Input Title"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Label className="fs-5 fw-bold ">Image</Form.Label>
          <Form.Group className="mb-4" controlId="formBasic">
            <Form.Control
              type="file"
              name="image"
              onChange={handleChange}
              placeholder="Input Image"
            />
          </Form.Group>
          <Form.Label className="fs-5 fw-bold ">Description</Form.Label>
          <CKEditor
            editor={ClassicEditor}
            // config={{
            //   ckfinder: {
            //     // Upload the images to the server using the CKFinder QuickUpload command.
            //     uploadUrl:
            //       "https://localhost:3000/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json",
            //   },
            // }}
            onChange={handleChangeEditor}
          />
          <div
            className="my-4"
            dangerouslySetInnerHTML={{ __html: form.description }}
          />
          <Button
            className="fw-bold btn-blue"
            style={{ fontSize: "0.9rem" }}
            variant=""
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
