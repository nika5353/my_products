# My Products API

## Architecture

This API is an Express + MongoDB service with a layered structure:

- Entry point: the server starts in [src/server.js](src/server.js) and wires the app plus DB connection via `connectDB`.
- App setup: middleware and route mounting live in [src/app.js](src/app.js).
- Routes: HTTP endpoints are defined in:
	- [src/routes/auth.routes.js](src/routes/auth.routes.js)
	- [src/routes/product.routes.js](src/routes/product.routes.js)
	- [src/routes/user.routes.js](src/routes/user.routes.js)
- Controllers: request handlers live in:
	- [src/controllers/auth.controller.js](src/controllers/auth.controller.js)
	- [src/controllers/product.controller.js](src/controllers/product.controller.js)
	- [src/controllers/user.controller.js](src/controllers/user.controller.js)
- Models: Mongoose schemas in:
	- [src/models/User.js](src/models/User.js)
	- [src/models/Product.js](src/models/Product.js)
- Middleware: auth + upload helpers in:
	- [src/middlewares/auth.middleware.js](src/middlewares/auth.middleware.js)
	- [src/middlewares/upload.middleware.js](src/middlewares/upload.middleware.js)
- Services: reusable logic in:
	- [src/services/token.service.js](src/services/token.service.js)
	- [src/services/upload.service.js](src/services/upload.service.js)
- Static assets: uploaded files are served from [uploads/](uploads/) at `/uploads`.

## Running the server

From the api folder:

1. Install dependencies:
	 - `npm install`
2. Start the dev server:
	 - `npm run dev`

The server listens on port 5000 (see [src/server.js](src/server.js)).

## Environment variables

Create a file named .env in [.env](.env) with:

```
MONGO_URI=mongodb://localhost:27017/my_products
JWT_SECRET=replace_with_a_strong_secret
PORT=5000
```

Notes:
- `MONGO_URI` is used by `connectDB` in [src/config/db.js](src/config/db.js).
- `JWT_SECRET` is used in [src/services/token.service.js](src/services/token.service.js) and auth middleware.
