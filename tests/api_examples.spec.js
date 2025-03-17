import {test, expect} from '@playwright/test'
import users from '../test-data/usersResponse.json'
import { request } from 'http';


test.describe("API Verification Examples", async()=>{

    //1: test to verify users endpoint is returning expected users. 
    test("Verify Multiple Records", async({request})=>{
        //save raw response into a variable
        const response = await request.get('https://reqres.in/api/users?page=2');

        //parse the response body into a JS object with access to data within reponse body
        const responseBody = await response.json();

        //see what is stored
        //console.log(responseBody);

        expect(response.status()).toBe(200);
        expect(responseBody).toEqual(users);
        
    })

    //2: test data for a single user. 
    test('Test Single User Data', async({request})=>{
        const response = await request.get('https://reqres.in/api/users/7');
        const responseBody = await response.json();

        //console.log(responseBody);

        //asser users info
        expect(response.status()).toBe(200);
        expect(responseBody.data.id).toBe(7);
        expect(responseBody.data.email).toBe("michael.lawson@reqres.in");
        expect(responseBody.data.first_name).toBe('Michael');

        //you can use the . to dig into JSON objects. so the json object.firstlayer.secondlayer.thirdlayer and so on.

    })

    //3: test for POST request
    test('Verify POST test', async({request})=>{
        const newUser = {
            name: "sam",
            job: 'QAE'
        }
        //create a request

        const response = await request.post('https://reqres.in/api/users',{data:newUser});

        const responseBody = await response.json();
        //console.log(responseBody);
        

        expect(response.status()).toBe(201);
        expect(responseBody.name).toBe('sam');
        expect(responseBody.job).toBe('QAE');
    })

    //4: Verify PUT request
    test('Verify PUT', async({request})=>{
        const newUser = {
            name: 'idiot',
            job: 'stupid idiot'
        }

        //create the put
        const response = await request.put('https://reqres.in/api/users/2', {data: newUser});
        const responseBody = await response.json();
        console.log(responseBody);

        expect(response.status()).toBe(200);
        expect(responseBody.name).toBe(newUser.name);
        
    })

    //5: Verify Delete Request
    test('DELETE test', async({request})=>{
        const response = await request.delete('https://reqres.in/api/users/2');
        //const responseBody = await response.json(); the JSON is an empty body so it does not provide much feedback. Best to use status.
        console.log(response.status());
        expect(response.status()).toBe(204);
        
    })

})