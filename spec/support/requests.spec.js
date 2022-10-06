// Task 1
//<Part 1>: Send http GET request to target url and read response body

const axios = require('axios');

describe("Sending 'http' requests", () => {

    let getData;
    let getStatus;
    let postStatus;
    let postData;

    beforeEach((done) => {
        axios
            .get(
                // Send http 'get' request
                "http://ptsv2.com/t/fu807-1554722621/post"
            )
            .then(response => {
                // Read response from endpoint
                getData = response.data;
                getStatus = response.status;
                done();


            })
            // if the above fails to .get, then catch error here 
            .catch(error => {
                done.fail('axios.get failed to execute', error);
            });
    });
    // validate if the 'get'resource endpoint exist
    it('GET /return 200 response', () => {
        expect(getStatus).toBe(200);
    })

//<Part 2> {targetUrl} endpoint uses the BASIC Authorization method. Send a POST request to {targetUrl} and create 3 test cases to validate the response body.
    async function postRequest() {
        // pass the {target Url} response and set the BASIC auth
        await axios.post(getData['targetUrl'], {}, {
            auth: {
                username: 'automate',
                password: 'everything'
            }
            // get the post request response
        }).then(response => {
            postStatus = response.status;
            postData = response.data;

        })
    }
    //validate if the target url is OK
    it('POST /return 200 response', async () => {

        await postRequest();
        expect(postStatus).toBe(200);
    })
    //validate the response body for target url

    //validate if the IP address is as expected
    it('POST /return IP address', async () => {

        await postRequest();
        expect(postData['ip']).toBe('192.168.2.2');
    })

    //validate if the 'token' data is as expected
    it('POST /return token', async () => {

        await postRequest();
        expect(postData['token']).toBe('0799249366');
    })

});
