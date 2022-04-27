import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001/";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  static token = null;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      console.log("message:", message);
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

  /** Get user info 
   * 
   * input: username
   * 
   * returns user information like { username, firstName, lastName, isAdmin, jobs }
   *   where jobs is { id, title, companyHandle, companyName, state }
   */
   static async getUser(username){
    const res = await this.request(`users/${username}`);
    return res.user;
  } 

  /** Get token from API with valid username/password combo
   * 
   * input: credentials is an object like {username, password}
   * 
   * returns token (string)
   */
  static async loginUser(credentials){
      const res = await this.request('auth/token/', credentials, 'post');
      JoblyApi.token = res.token;
      return res.token;
  } 

  /** Register new user with valid user info 
   * 
   * input: userInfo is an object like {username, password, firstName, lastName, email}
   * 
   * set static token to returned token (string)
   * 
   * returns token from API
   */
   static async registerNewUser(userInfo){
    const res = await this.request('auth/register/', userInfo, 'post');
    JoblyApi.token = res.token;
    return res.token;
  } 

  /** Edit profile information
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

  /** Log Out User by setting JoblyApi.token to null
   * 
   * input: none
   * 
   * returns none
   */
   static logOutUser(){
    JoblyApi.token = null;
  } 


}

export default JoblyApi;