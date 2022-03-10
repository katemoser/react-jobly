import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes
  //REMEMBER: If we ever need to translate/edit API data this is the place to do it
  //NOT in the component

  /** Get details on a company by handle. 
   * 
   * Input: a company handle 
   *  ex. "davis-davis"
   * 
   * Returns: { handle, name, description, numEmployees, logoUrl, jobs }
   * where jobs is [{ id, title, salary, equity }, ...]
  */

  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get a list of companies
   * 
   * Optional input: a query parameter to filter search criteria
   *  ex. {name : "and"}
   * 
   * Returns: [ { handle, name, description, numEmployees, logoUrl }, ...]
   */

  static async getCompanies(params = {}) {
    const res = await this.request(`companies/`, params);
    return res.companies;
  }

  /** Get a list of jobs 
   * 
   * Optional input: a query parameter to filter search criteria 
   *  ex. {title : "broker"}
   * 
   * Returns: [ { id, title, salary, equity, companyHandle, companyName }, ...]
  */
  
  static async getJobs(params = {}) {
    const res = await this.request(`jobs/`, params);
    return res.jobs;
  }

  /**Get user info 
   * 
   * input: username
   * 
   * returns  user information like { username, firstName, lastName, isAdmin, jobs }
   *   where jobs is { id, title, companyHandle, companyName, state }
   */
   static async getUser(username){
    const res = await this.request(`users/${username}`);
    return res.user;
  } 

  /**Get token from API with valid username/password combo
   * 
   * input: {username, password}
   * 
   * returns token (string)
   */
  static async loginUser(credentials){
    const res = await this.request('auth/token/', credentials, 'post');
    console.log("TOKEN:", res.token);
    JoblyApi.token = res.token;
    return res.token;
  } 

  /**Register new user with valid user info 
   * 
   * input: {username, password, firstName, lastName, email}
   * 
   * set static token to returned token (string)
   */
   static async registerNewUser(userInfo){
    const res = await this.request('auth/register/', userInfo, 'post');
    console.log("TOKEN:", res.token);
    JoblyApi.token = res.token;
    return res.token;
  } 

  /**Edit profile information
   * 
   * input: username, newUserInfo (obj)
   *  newUserInfo can include: { firstName, lastName, password, email }
   * 
   * returns updated user information like { firstName, lastName, password, email }
   */
   static async updateProfile(username, newUserInfo){
    const res = await this.request(`users/${username}`, newUserInfo, 'patch');
    return res.user;
  } 

  


}

export default JoblyApi;