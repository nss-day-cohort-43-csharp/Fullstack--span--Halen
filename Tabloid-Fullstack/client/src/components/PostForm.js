import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Form,
  FormGroup,
  Card,
  CardBody,
  Label,
  Input,
  Button,
} from "reactstrap";
import { UserProfileContext } from "../providers/UserProfileProvider";

const PostForm = () => {
  const [post, setPost] = useState([]);
  const { getToken } = useContext(UserProfileContext);
  const [categories, setCategories] = useState([]);

  // Use this hook to allow us to programatically redirect users
  const history = useHistory();

  useEffect(() => {
    getToken()
      .then((token) =>
        fetch(`/api/category`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      )
      .then((res) => res.json())
      .then((cat) => setCategories(cat));
  }, []);

  const handleSubmit = (e) => {
    const newPost = { ...post };
    newPost[e.target.name] = e.target.value;
    setPost(newPost);
  };

  const addPost = (post) => {
    getToken()
      .then((token) =>
        fetch("/api/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/JSON",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(post),
        })
      )
      .then(() => history.push(`/myposts`));
  };

  return (
    <div className="container pt-4">
      <div className="row justify-content-center">
        <Card className="col-sm-12 col-lg-6">
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="imageLocation">Header Image URL</Label>
                <Input
                  id="imageLocation"
                  type="url"
                  name="ImageLocation"
                  onChange={(e) => handleSubmit(e)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  id="title"
                  type="title"
                  name="Title"
                  onChange={(e) => handleSubmit(e)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="content">Content</Label>
                <Input
                  id="content"
                  type="textarea"
                  name="Content"
                  onChange={(e) => handleSubmit(e)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="selectCategory">Category</Label>
                <Input
                  type="select"
                  name="CategoryId"
                  id="category"
                  onChange={(e) => handleSubmit(e)}
                >
                  <option>Select Category ...</option>
                  {categories.map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="publishDateTime">Publication Date</Label>
                <Input
                  id="publishDateTime"
                  type="date"
                  name="PublishDateTime"
                  onChange={(e) => handleSubmit(e)}
                />
              </FormGroup>
            </Form>
            <Button
              color="danger"
              onClick={(e) => {
                e.preventDefault();
                addPost(post);
              }}
            >
              SUBMIT POST
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default PostForm;
