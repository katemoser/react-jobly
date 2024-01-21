import { useState } from "react";
import "./SearchForm.css";
import { Form, Input, Button, Row, Col, FormGroup, Label } from "reactstrap";

/**
 * Search bar component for use in various other components
 *
 * props: handleSave (function located in parent component)
 *
 * state: formData (controlled component)
 *
 * { CompaniesDataFetcher, JobsDataFetcher } -> SearchForm
 */
function SearchForm({ handleSave }) {
    const initialData = { "searchInput": "" };

    const [formData, setFormData] = useState(initialData);

    /** Updates state with form input value */
    function handleChange(evt) {
        const fieldName = evt.target.name;
        const value = evt.target.value;

        setFormData(currData => {
            currData[fieldName] = value;
            return { ...currData };
        });
    }

    /** Calls parent component function with input data */
    function handleSubmit(evt) {
        evt.preventDefault();
        handleSave(formData.searchInput);
        setFormData(initialData);
    }

    return (
        <Form onSubmit={handleSubmit} className="Jobly-SearchForm d-flex justify-content-center">
            <Row className="row-cols-lg-auto g-3 align-items-center">
                <Col>

                    <Label className="visually-hidden" for="searchTerm">
                        Search Term
                    </Label>
                    <Input
                    id="searchTerm"
                        onChange={handleChange}
                        name="searchInput"
                        placeholder="Enter search term">
                    </Input>

                </Col>
                <Col>
                    <button className="btn btn-primary">Search</button>
                </Col>

            </Row>
        </Form>
    );
}

export default SearchForm;