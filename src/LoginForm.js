import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Label,
  Row,
  Col,
  Container,
  Alert,
} from "reactstrap";

/** LoginForm component, which displays login form for non-logged-in user
 *
 * Props:
 *  handleLogin : function that calls function in App component to login a user via the API
 *
 * State:
 *  - formData (controlled component)
 *  - formErrors -- array of errors if form isn't filled out correctly
 *
 * App -> Routes -> LoginForm
 */
function LoginForm({ handleLogin }) {

  // const navigate = useNavigate();
  const initialData = {
    username: "",
    password: "",
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
      await handleLogin(formData);
      // return <Navigate to="/companies" />
      // navigate('/companies')
    } catch (err){
      // console.log("Caught an error!", err)
      setFormErrors(err);
    }
  }

  return (
    <Container className="jobly-form">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Label htmlFor="username-input">Username</Label>
            <Input
              id="username-input"
              name="username"
              onChange={handleChange}
              required
            ></Input>
          </Col>

          <Col md={6}>
            <Label htmlFor="password-input">Password</Label>
            <Input
              id="password-input"
              name="password"
              onChange={handleChange}
              type="password"
              required
            ></Input>
          </Col>
        </Row>

        {formErrors.length
          ? <Alert color="danger">
              {formErrors}
            </Alert>
          : null
        }

        <Button color="primary" outline>Submit</Button>
      </Form>
    </Container>
  );
}

export default LoginForm;
