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

### SSL Error on dev

- Ingress is setup to use https by default
- To get around browser warning: type `thisisunsafe` in the Chrome privacy window
