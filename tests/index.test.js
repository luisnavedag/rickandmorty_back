const app = require('../src/app');
const session = require('supertest');
const agent = session(app);

describe("Test de RUTAS", () => {
    describe("GET /rickandmorty/character/:id", () => {
        it('Si hay un error responde con status: 500', async () => {
            await agent.get('/rickandmorty/character/1').expect(200);
        });
        it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
            const response = (await agent
            .get('/rickandmorty/character/1')).body;
            expect(response).toHaveProperty("id");
            expect(response).toHaveProperty("name");
            expect(response).toHaveProperty("species");
            expect(response).toHaveProperty("gender");
            expect(response).toHaveProperty("status");
            expect(response).toHaveProperty("origin");
            expect(response).toHaveProperty("image");
        });
        it('Si hay un error responde con status: 500', async () => {
            await agent.get('/rickandmorty/character/9879878').expect(500);
        });
    });
    describe("GET /rickandmorty/login", () => {
        it("Retorna un objeto con la propiedad access en true", async() => {
            const response = await agent.get("/rickandmorty/login?email=rym@gmail.com&password=123456");
            expect(response.body.access).toBe(true);
        });
        it("Retorna un objeto con la propiedad access en true", async() => {
            const response = await agent.get("/rickandmorty/login?email=rym@gmail.com&password=3556546");
            expect(response.body.access).toBe(false);
        });
    });
    describe("POST /rickandmorty/fav", () => {
        const character1 = {id: "1", name: "Rick"}; 
        const character2 = {id: "2", name: "Morty"}; 

        it("Lo que envies por body debe ser devuelto en arreglo", async() =>{
            const response = await agent.post("/rickandmorty/fav")
            .send(character1);
            expect(response.body).toEqual([character1])
        });
        it("Si vuelves a enviar otro objeto se agrega al objeto", async() =>{
            const response = await agent.post("/rickandmorty/fav")
            .send(character2);
            expect(response.body).toContainEqual(character1);
            expect(response.body).toContainEqual(character2);
        });
    })
    describe("DELETE /rickandmorty/fav/:id", () => {
        const character1 = {id: "1", name: "Rick"}; 
        const character2 = {id: "2", name: "Morty"}; 
        it("en el caso de que no haya ningún personaje con el ID que envías, sea un arreglo con los elementos previos sin modificar", async() => {
            const response = await agent.delete("/rickandmorty/fav/55");

            expect(response.body).toContainEqual(character1);
            expect(response.body).toContainEqual(character2);
        });
        it("debes testear que cuando envías un ID válido se elimine correctamente al personaje", async() => {
            const response = await agent.delete("/rickandmorty/fav/1");

            expect(response.body).toContainEqual(character2);
            expect(response.body).not.toContainEqual(character1);
        
        });
    })
})