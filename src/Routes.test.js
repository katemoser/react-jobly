const AxiosMockAdapter = require(
    "axios-mock-adapter");
const axios = require("axios");
const axiosMock = new AxiosMockAdapter(axios);


import { render } from "@testing-library/react";
//import axiosMock from "axios";
import { MemoryRouter } from "react-router-dom";
import Routes from "./Routes";
import React from "react";
//import "jest-dom/extend-expect";



it("renders the homepage", function () {
    const { debug, getByText } = render(
        <MemoryRouter initialEntries={["/"]}>
            <Routes />
        </MemoryRouter>);
    const h1Text = getByText("Jobly");
    expect(h1Text).toBeInTheDocument();
})

it("renders Company Detail", async function () {

    axiosMock.onGet(`http://localhost:3001/companies/test`)
        .reply(200, {
            handle: "test",
            name: "testName",
            description: "testDesc",
            numEmployees: 5,
            logoUrl: "testUrl",
            jobs: [{
                id: "testId",
                title: "testTitle",
                salary: 10000,
                equity: .1
            }]
        });

    const { debug, getByText, findByText, container} = render(
        <MemoryRouter initialEntries={["/companies/test"]}>
            <Routes />
        </MemoryRouter>
    )
    
    debug(container);

});

    // axiosMock.get.mockResolvedValueOnce({
    //     data: {
    //         handle: "test",
    //         name: "testName",
    //         description: "testDesc",
    //         numEmployees: 5,
    //         logoUrl: "testUrl",
    //         jobs: [{
    //             id: "testId",
    //             title: "testTitle",
    //             salary: 10000,
    //             equity: .1
    //         }]
    //     }
    // });

//     const {debug, getByText, findByText} = render(
//         <MemoryRouter initialEntries={["/companies/test"]}>
//             <Routes />
//         </MemoryRouter>
//     );

//     // const {getByText} = render(
//     //     <CompanyDetail />
//     // )

//     const companyName = await findByText("testName");
//     expect(companyName).toBeInTheDocument();
// })