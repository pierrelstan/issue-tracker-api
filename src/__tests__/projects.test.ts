import request from "supertest";
import { app } from "../..";
import mongoose from "mongoose";

let userInput: any = {
    email: "test03@demo.com",
    password: "1234567890",
};
let data;

beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_API_KEY);
    data = await (
        await request(app).post("/api/users/signin").send(userInput)
    ).body;
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

describe("GET /api/projects", function () {
    it("should return all projects", async () => {
        const res = await request(app)
            .get("/api/projects")
            .set({ Cookie: [`bug-tracker-token=${data.token}`] })
            .send();
        expect(res.statusCode).toBe(200);
        expect(res.body.projects.length).toBeGreaterThan(0);
    });
});

describe("POST /api/project", function () {
    it("should create a project", async () => {
        const res = await request(app)
            .post("/api/projects")
            .set({ Cookie: [`bug-tracker-token=${data.token}`] })
            .send("title=theproject");
        expect(res.statusCode).toBe(201);
    });
});
