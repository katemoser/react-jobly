import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./userContext";
import {
  Form,
  Input,
  Button,
  Label,
  Row,
  Col,
  Container,
  FormGroup,
  Alert,
} from "reactstrap";
import "./EditProfileForm.css";

/** EditProfileForm component, which displays form to edit user info for logged-in user
 *
 * Props:
 *  handleSaveChanges : function that calls function in App component to update a user via the API
 *
 * State:
 *  - formData (controlled component)
 *  - formErrors : Array of errors if form submission is unsuccessful
 *
 * App -> Routes -> Profile -> EditProfileForm
 */
function EditProfileForm({ handleSaveChanges }) {

  const navigate = useNavigate();
  //get the user from context and set to initial data
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);

  // TODO: object shorthand
  const initialData = {
    username: currentUser.username,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
  };

  const [formData, setFormData] = useState(initialData);
  const [formErrors, setFormErrors] = useState([]);

  /** Updates state with form input value */
  function handleChange(evt) {
    const fieldName = evt.target.name;
    const value = evt.target.value;

    setFormData((currData) => {
      currData[fieldName] = value;
      return { ...currData };
    });
  }

  /** Upon submit, calls parent function to update current user info */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await handleSaveChanges({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      });

      // TODO: redirect to profile page, once created
      navigate("/");

    } catch (err) {
      console.log("ERROR IN FORM", err);
      setFormErrors(err);
    }
  }

  return (
      <Row className="EditProfileForm">
        <Col xs="1"></Col>
        <Col xs="10">

          <Container className="EditProfileForm-form card mb-3">
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="username-input">Username</Label>
                <Input
                  disabled
                  id="username-input"
                  name="username"
                  onChange={handleChange}
                  value={formData.username}
                ></Input>
              </FormGroup>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="firstName-input">First Name</Label>
                    <Input
                      required
                      id="firstName-input"
                      name="firstName"
                      onChange={handleChange}
                      value={formData.firstName}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="lastName-input">Last Name</Label>
                    <Input
                      required
                      id="lastName-input"
                      name="lastName"
                      onChange={handleChange}
                      value={formData.lastName}
                    ></Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label htmlFor="email-input">Email</Label>
                    <Input
                      required
                      id="email-input"
                      name="email"
                      type="email"
                      onChange={handleChange}
                      value={formData.email}
                    ></Input>
                  </FormGroup>
                </Col>
              </Row>

              {formErrors.length
                ? <Alert color="danger">
                  {formErrors}
                </Alert>
                : null
              }

              <Button>Submit</Button>
            </Form>
          </Container>
        </Col>
        <Col xs="1"></Col>
      </Row>
  );
}

export default EditProfileForm;
