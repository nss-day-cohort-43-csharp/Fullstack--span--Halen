import React, { useEffect, useState, useContext } from "react";
import {
  ListGroup,
  ListGroupItem,
  Input,
  InputGroup,
  Button,
} from "reactstrap";
import Category from "../components/Category";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { Redirect } from "react-router-dom";


const CategoryManager = () => {
  const { getToken } = useContext(UserProfileContext);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const { getCurrentUser, isAdmin } = useContext(UserProfileContext);

  //this if statment is here for a reason but can't remember why 
  // useEffect(() => {
  //   if (getCurrentUser === isAdmin) {

  //     getCategories();
  //   }
  //   if (getCurrentUser === !isAdmin) {
  //     return (null)
  //   }
  // }, []);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    getToken().then((token) =>
      fetch(`/api/category`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((categories) => {
          setCategories(categories);
        })
    );
  };

  const saveNewCategory = () => {
    const categoryToAdd = { name: newCategory };
    getToken().then((token) =>
      fetch("/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryToAdd),
      }).then(() => {
        setNewCategory("");
        getCategories();
      })
    );
  };
  //add an onEdit to use in Category to give access to getCategories
  if (!isAdmin()) {
    return <Redirect to="/404" />;
  } else {
    return (
      <div className="container mt-5">
        <img
          height="100"
          src="/quill.png"
          alt="Quill Logo"
          className="bg-danger rounded-circle"
        />
        <h1>Category Management</h1>
        <div className="row justify-content-center">
          <div className="col-xs-12 col-sm-8 col-md-6">
            <ListGroup>
              {categories.map((category) => (
                <ListGroupItem key={category.id}>
                  <Category
                    category={category}
                    onEdit={getCategories}
                    onDelete={getCategories}
                  />
                </ListGroupItem>
              ))}
            </ListGroup>
            <div className="my-4">
              <InputGroup>
                <Input
                  onChange={(e) => setNewCategory(e.target.value)}
                  value={newCategory}
                  placeholder="Add a new category"
                />
                <Button onClick={saveNewCategory}>Save</Button>
              </InputGroup>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CategoryManager;
