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
  // the token for interactive with the API will be stored here.
  static token;

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

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // obviously, you'll add a lot here ...

  /** Get all companies or companies that match query */ // TODO: update name to searchTerm
  static async getCompanies(name) {
    const res = await this.request(`companies`, { name });
    return res.companies;
  }

  /** Get all Jobs or jobs that match query */
  static async getJobs(title) {
    const res = await this.request(`jobs`, { title });
    return res.jobs;
  }

  /** Authenticate with username and password and return token */
  static async login(loginData) {
    const res = await this.request(`auth/token`, loginData, 'post');
    return res.token;
  }

  /** Register user and return token */
  static async registerUser(signupData) {
    const res = await this.request(`auth/register`, signupData, 'post');
    return res.token;
  }

  /** Get a User */
  static async getUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  /** update a user's information */
  static async updateUser({username, firstName, lastName, password, email }) {
    const res = await this.request(`users/${username}`,
      {
        firstName,
        lastName,
        email,
        password
      }, 'patch'
    );
    return res.user;
  }

  /** update a user's information */
  static async applyToJob({username, jobId }) {
    const res = await this.request(`users/${username}/jobs/${jobId}`,null, 'post');
    return res.applied;
  }

// update name of file to temp, commit and then change again 'job



}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi