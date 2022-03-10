import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Routes from "./Routes";

it("renders the homepage", function(){
    const {debug, getByText} = render(
        <MemoryRouter initialEntries={["/"]}>
            <Routes />
        </MemoryRouter>);
    const h1Text = getByText("Jobly");
    expect(h1Text).toBeInTheDocument();
})

it("renders Company Detail")