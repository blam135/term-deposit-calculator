<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

- Docker (For Runtime)
- Node JS (For Development)
- NPM (For Development)
- NVM (For Development)

### Installation - (To Run the API)
1. Ensure you have Docker installed
2. Build the Docker image using the following command (ensure you're in the repository root direcotry)
```sh
docker build . -t interest-rate --no-cache
```
3. Once the Docker image has been built, run this command to run the container locally
```sh
docker run -d -p 3000:3000 --name interest-rate-server interest-rate
```
4. Test the container works by running
```sh
curl -X POST localhost:3000/v1/term-deposit/calculate
```
and if you receive a response body similar to 
```sh
{"error":[{"message":"\"depositAmount\" is required","path":["depositAmount"],"type":"any.required","context":{"label":"depositAmount","key":"depositAmount"}}]}
```
this means the service is up and running

#### Troubleshooting
- If you don't receive the correct response, ensure there is nothing running on port 3000 before instantiating the container. Use this command `sudo lsof -i :3000` to check if there is something running

### Testing
To run tests, run `npm run test`

### Installation - (For Development)

1. Ensure you have the right node version (>= 20). You can run `nvm use` to install the right version for development
2. Run `npm ci`
3. Ensure you have a .env file set up. See `.env.sample` file 
4. Run `npm start`

<!-- USAGE EXAMPLES -->
## Usage
Use Postman to invoke the following endpoints

### POST `v1/term-deposit/calculate`
Gets the final balance for a term deposit given a request body

#### Request:
```json
{
  /**
   * The initial balance, represented in Cents
   */
  depositAmount: number;
  /**
   * Represented as the full amount in percentage i.e. 1.1 = 1.1% 
   */
  interestRate: number;
  /**
   * The period in which the term deposit is to be invested for - represented in months
   */
  investmentTerm: number;
  /**
  * The payout period of the term deposit
  * Note: interestPaid cannot be ANNUALLY if the investmentTerm is < 12 months
   */
  interestPaid: "MONTHLY" | "QUARTERLY" | "ANNUALLY" | "MATURITY";
}
```

#### Response: 
```json
200 OK
{
  "finalBalance": number
}
```

## Future Improvements
- At the moment, JOI validation in the code only ensures each fields match a certain criteria. However, such functions are available in to check if a certain criteria is met in other fields then the field that is checked needs to match a criteria
e.g. Can do a JOI Validation where if `interestPaid` = `ANNUALLY` then the interestPaid must be more than >= 12 months
- The Interest Rate field in the request body could be represented as a decimal rather than a number in % to prevent unncessary conversions in the code, in turn allowing it to be extensible 
- There is no integration testing at the moment. Would create one to ensure the API and the running server works as expected  
- There is no unit testing for the routes. Would help with code coverage and ascertain routes call out to specific functions correctly
- Response returns a very precise number when it could just return up to 2 DP or a rounded whole number for the client for simplicity (depending on the use case but for front end on the Bendigo website, it'd make more sense)
- To make it further extensible, a controller + service class could be created to delegate certain action items to specific services
- A reputable package such as Decimal.js could be used to handle calculations instead of using the native JS library

## Reasons for Certain Decision Making / Assumptions
- RESTFul API is used instead of a CLI as suggested in the spec, as this is the framework I am familiar with and is easier to extend 
- Deposit Amount in the Request Body is represented in cents to allow for accurate term deposit calculations and is the smallest denomination offered
- Investment Term in the Request Body is represneted in months as it is the smallest period offered 
- Bendigo Term Deposit website was used for unit tests assertions 
- Compound Interest Formula was used from this website https://cleartax.in/s/compound-interest-calculator
