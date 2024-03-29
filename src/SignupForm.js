import "./SignupForm.css";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
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

/** SignupForm for non-logged-in user
 *
 * Props:
 *  Signup function : Calls function in App component to signup a user via the API
 *
 * State:
 *  - formData (controlled component)
 *  - formErrors : array of error messages displayed after form suibmission if
 *    not successful
 *
 * App -> Routes -> SignupForm
 */
function SignupForm({ handleSignup }) {

  // const navigate = useNavigate();
  const initialData = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [formErrors, setFormErrors] = useState([])

  /** Updates state with form input value */
  function handleChange(evt) {
    const fieldName = evt.target.name;
    const value = evt.target.value;

    setFormData((currData) => {
      currData[fieldName] = value;
      return { ...currData };
    });
  }

  /** Calls parent component function with input data */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try{
      await handleSignup(formData);
      // navigate("/");
      // setFormSubmitted(true);
    } catch(err){
      setFormErrors(err);
    }
  }

  return (
    <Row className="SignupForm">
    <Col xs="1"></Col>
      <Col xs="10">
    <Container className="card border-primary mb-3">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="username-input">Username</Label>
              <Input
                id="username-input"
                name="username"
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="password-input">Password</Label>
              <Input
                id="password-input"
                name="password"
                onChange={handleChange}
                type="password"
                required
              ></Input>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="firstName-input">First Name</Label>
              <Input
                id="firstName-input"
                name="firstName"
                onChange={handleChange}
                required
              ></Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="lastName-input">Last Name</Label>
              <Input
                id="lastName-input"
                name="lastName"
                onChange={handleChange}
                required
              ></Input>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <Label for="email-input">Email</Label>
            <Input
              id="email-input"
              name="email"
              onChange={handleChange}
              type="email"
              required
            ></Input>
          </Col>
        </Row>

        <Row>
          <Col>
            <Button color="primary" outline>
              Submit
            </Button>
          </Col>
        </Row>

        {formErrors.length
          ? <Alert >
              {formErrors}
            </Alert>
          : null
        }

      </Form>
    </Container>
    </Col>
    <Col xs="1"></Col>
    </Row>
  );
}

export default SignupForm;
