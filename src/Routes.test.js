import { render } from "@testing-library/react";
import {axios, axiosMock} from "axios";
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

it("renders Company Detail", async function(){
    axiosMock.get.mockResolvedValueOnce({ 
        data: {  
            handle:"test", 
            name: "testName", 
            description: "testDesc", 
            numEmployees: 5, 
            logoUrl: "testUrl",
            jobs: [{ id:"testId", 
                     title:"testTitle", 
                     salary: 10000, 
                     equity: .1 
                    }] 
                } 
    });

    const {debug, getByText} = render(
        <MemoryRouter initialEntries={["/companies/test"]}>
            <Routes />
        </MemoryRouter>
    );

    const companyName = getByText("testName");
    expect(companyName).toBeInTheDocument();
})