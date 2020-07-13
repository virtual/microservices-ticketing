# Ticketing App

Ticketing app following along with [Microservices with Node and React](https://www.udemy.com/course/microservices-with-node-js-and-react)

## Development

- Run `skaffold dev` to start the development K8s/Docker files

## Routes\*

- We will use `express-validator` to validate input (req.body) as route middleware

  - validation: making sure the input is what we intend
  - sanitization: changing the input to what we need
  - Use `validationResult` to pull out the error messages produced during validation step

```ts
router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isString()
  ],
  (req, res) => {
    ...
```

### Auth Routes

| Route                 | Method | Body                                | Purpose                        |
| --------------------- | ------ | ----------------------------------- | ------------------------------ |
| /api/users/signup     | POST   | `{email: string, password: string}` | Sign up for an account         |
| /api/users/signin     | POST   | `{email: string, password: string}` | Sign in to an existing account |
| /api/users/signout    | POST   | `{}`                                | Sign out                       |
| /api/user/currentuser | GET    |                                     | Return info about the user     |

\* Tables generated with https://www.tablesgenerator.com/markdown_tables#

## Notes

### Error responses

- As we include more microservices (possibly built using different frameworks/langauges), the error objects may also be formatted differently
- We need to define the format of the error object returned to be consistent for the React front-end
- [Express error handling](https://expressjs.com/en/guide/error-handling.html) lets you create a custom middleware function for error handling; it _must_ include 4 arguments in order to know that it is an error handling middleware

```ts
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

Common error response for this project:

```ts
{
  errors: {
    message: string,
    field?: string
  }[]
}
```

### SSL Error on dev

- Ingress is setup to use https by default
- To get around browser warning: type `thisisunsafe` in the Chrome privacy window
