
import express from 'express'
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from "swagger-jsdoc";
const app = express()
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Documentation API",
            description: "",
            servers: ["http://localhost:3000"]
        }
    },
    basePath: "/",
    apis: ['../car.routes.ts']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default app