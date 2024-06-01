import { test, expect } from "@playwright/test";

// Define base URL for the API
const baseUrl = "https://reqres.in/api";

// Helper function to generate random names
function generateRandomName() {
    const names = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Henry", "Ivy", "Jack", "Kate", "Liam", "Mia", "Noah", "Olivia", "Peter", "Quinn", "Ryan", "Sophia", "Thomas", "Uma", "Victor", "Wendy", "Xavier", "Yara", "Zoe"];
    return names[Math.floor(Math.random() * names.length)];
}

test.describe.parallel("API Testing", () => {
    // Store user ID for later use
    let userId: number;

    test("Get A Single User", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/2`);

        expect(response.status()).toBe(200);

        const responseData = await response.json();
        const userData = responseData.data;

        // Assert id, email, first_name, and last_name fields
        expect(userData.id).toBe(2);
        expect(userData.email).toBe("janet.weaver@reqres.in");
        expect(userData.first_name).toBe("Janet");
        expect(userData.last_name).toBe("Weaver");
    });

    test("Endpoint Does Not Exist", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/doesNotExist`);

        expect(response.status()).toBe(404);
    });

    test("Create A User with Proper Information", async ({ request }) => {
        // Generate random name and job
        const name = generateRandomName();
        const job = "leader";

        const response = await request.post(`${baseUrl}/users`, {
            data: {
                name,
                job,
            },
        });

        expect(response.status()).toBe(201);

        const responseData = await response.json();

        expect(responseData).toHaveProperty('name', name);
        expect(responseData).toHaveProperty('job', job);

        // Store user ID for later use
        userId = responseData.id;
    });

    test("Create A User with Invalid Information", async ({ request }) => {
        const response = await request.post(`${baseUrl}/users`, {
            data: {
                // Invalid request with missing required fields
            },
        });

        expect(response.status()).toBe(400);
    });

    test("Create A User with Incorrect Format", async ({ request }) => {
        const response = await request.post(`${baseUrl}/users`, {
            // Incorrect request format, should be an object with a 'data' property
        });

        expect(response.status()).toBe(400);
    });

    test("Update A User: Job with Invalid User ID", async ({ request }) => {
        const response = await request.put(`${baseUrl}/users/invalidUserId`, {
            data: {
                job: "Project Manager",
            },
        });

        expect(response.status()).toBe(404);
    });

    test("Update A User: Job with Proper Information", async ({ request }) => {
        // Generate random job
        const job = "Project Manager";

        const response = await request.put(`${baseUrl}/users/${userId}`, {
            data: {
                job,
            },
        });

        expect(response.status()).toBe(200);

        const responseData = await response.json();

        expect(responseData.job).toBe(job);
    });

    test("Delete A User with Invalid User ID", async ({ request }) => {
        const response = await request.delete(`${baseUrl}/users/invalidUserId`);

        expect(response.status()).toBe(404);
    });

    test("Delete A User with Proper User ID", async ({ request }) => {
        const response = await request.delete(`${baseUrl}/users/${userId}`);

        expect(response.status()).toBe(204);
    });
});
