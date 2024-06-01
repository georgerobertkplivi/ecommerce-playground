
## This repository contains automated tests for both UI and API using Playwright.

# Installation
Before running the tests `cd` into `qa-challenge-main` directory where the test reside, make sure to install the dependencies locally by running: `npm install`

### Resource Location
Page Objects: `qa-challenge-main/pages`

UI Tests: `qa-challenge-main/tests/ui`

API Tests: `qa-challenge-main/tests/api`


# Running Tests
Run all tests (UI and API):`npx playwright test`

Run UI tests only:`npm run test:ui`

Run API tests only:`npm run test:api`


# Building Docker Image
To build the Docker image before running the tests, use the following command:`docker build -t mixmax-task .`


# Running Tests in Docker
To run the Docker container and execute the tests, follow the steps below:

Build the Docker image (if not already built):`docker build -t mixmax-task .`


Run the Docker container:`docker run --rm mixmax-task`


# Running Specific Tests in Docker
### You can run specific tests within the Docker container using the following commands:

Sign Up Tests:`docker run -it mixmax-task:latest npm run test:signup`

Login Tests:`docker run -it mixmax-task:latest npm run test:login`

Product Tests:`docker run -it mixmax-task:latest npm run test:product`

UI Tests:`docker run -it mixmax-task:latest npm run test:ui`

API Tests:`docker run -it mixmax-task:latest npm run test:api`



# Generate Report
Generate allure report: `npm run generate:allure`

Allure Report: `allure generate allure-results -o allure-report --clean`

Open Report: `allure open allure-report`


