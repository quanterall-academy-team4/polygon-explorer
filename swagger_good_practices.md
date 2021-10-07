#Swagger implementation

We used swagger-ui-express npm package to implement swagger into the project.
It allows us to serve auto-generated swagger-ui generated API docs.

## Automated testing
For the testing we use jest-openapi npm package.
It lets us automatically test whether server's behaviour and documentation match.


##Good practices:

###1. Define error codes:
Defining error codes makes the job of the frontend developers easier.
With the status codes, developers can instantly identify the issue.

###2. Use mocks:
Using mocks allows the frontend developers to work, before the backend is finished.

###3. Use nouns instead of verbs:
This is because our HTTP request method already has the verb. 
Having verbs in our API endpoint paths isn’t useful and it makes it unnecessarily long since it doesn’t convey any new information.