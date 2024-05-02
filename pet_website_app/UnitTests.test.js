const {addProduct, fetchProducts, addAudit, auditProducts, deleteProduct, deleteAudit, addToCart, removeFromCart,clearCart,subtotal} = require('./controllers/productController');
const {addUser, findUser} = require('./controllers/userController');
const {connectMongoMemory, closeDatabase, dropCollections} = require('./memoryDatabase');
const app = require('./app');
const request = require('supertest');
const productController = require('./controllers/productController');

// Mock the connectDatabase function
jest.mock('./database', () => ({
    connectMongo: jest.fn(),
  })); 
// Runs before tests start
beforeAll( async (done) => {
    // Creates connection to in-memory database
    await connectMongoMemory();
    done();
});

// Runs after each test is run
afterEach(async (done) => {
    // Drops all collections from database, reseting the database
    await dropCollections();
    done();
});

test("addProduct",async(done) => {
    let prods = await fetchProducts();
    // Products collection should be empty
    expect(prods.length).toBe(0); 
    
    // Add toothbrush product, should be successful
    expect(await addProduct("Toothbrush",10.99,["Grooming"],"Ferret","","It's a toothbrush!")).toBe(true); 
    let prods2 = await fetchProducts();
    expect(prods2[0].productName).toBe("Toothbrush");
    expect(prods2.length).toBe(1); 

    // Try to add duplicate product, should fail to add
    expect(await addProduct("Toothbrush",10.99,["Grooming"],"Ferret","","It's a toothbrush!")).toBe(false); 

    done();
});
test("addProduct with various scenarios", async (done) => {
    // Products collection should be empty
    prods = await fetchProducts();
    expect(prods.length).toBe(0);

    // Add a valid product
    expect(await addProduct("Toothbrush", 10.99, ["Grooming"], "Ferret", "", "It's a toothbrush!")).toBe(true);
    let prods1 = await fetchProducts();
    expect(prods1.length).toBe(1);

    // Try to add the same product again, should fail to add
    expect(await addProduct("Toothbrush", 10.99, ["Grooming"], "Ferret", "", "It's a toothbrush!")).toBe(false);
    let prods2 = await fetchProducts();
    expect(prods2.length).toBe(1); // Ensure only one product exists

    // Try to add a product with empty tags, should be successful
    expect(await addProduct("Blanket", 19.99, [], "Ferret", "", "A cozy blanket.")).toBe(true);
    let prods4 = await fetchProducts();
    expect(prods4.length).toBe(2); // Ensure a new product was added

    // Try to add a product with special characters in the name and description
    expect(await addProduct("!@#$%", 15.99, ["Special"], "Ferret", "", "!@#$%")).toBe(true);
    let prods5 = await fetchProducts();
    expect(prods5.length).toBe(3); // Ensure a new product was added

    done();
});


test("deleteProduct", async (done) => {
    // Add test product to the database
    await addProduct("Toothbrush",10.99,["Grooming"],"Ferret","","It's a toothbrush!");
    prods = await fetchProducts();
    expect(prods.length).toBe(1); 

    // Attempt to delete test product from database, should be successful
    expect(await deleteProduct("Toothbrush")).toBe(true);
    prods = await fetchProducts();
    expect(prods.length).toBe(0); 

    // Attempt to delete test product from the database, should fail because product was deleted in last call to deleteProduct
    expect(await deleteProduct("Toothbrush")).toBe(false);
    prods = await fetchProducts();
    expect(prods.length).toBe(0); 

    done();
});

test("auditProducts", async(done) => {
    // Fetch audits, the collection should be empty
    let audits = await auditProducts();
    expect(audits.length).toBe(0);

    // Add audit, should be successful
    expect(await addAudit("Test1","Seth","Added Product")).toBe(true);
    // Add duplicate audit, which should also be successful
    expect(await addAudit("Test1","Seth","Added Product")).toBe(true);

    // Fetch audits, there should be two audits
    audits = await auditProducts();
    expect(audits.length).toBe(2);
    expect(audits[0]).toHaveProperty("productName", "Test1");
    expect(audits[0]).toHaveProperty("adminName", "Seth");
    expect(audits[0]).toHaveProperty("action", "Added Product");
    expect(audits[0]).toHaveProperty("timeStamp");

    // Check properties of the second audit
    expect(audits[1]).toHaveProperty("productName", "Test1");
    expect(audits[1]).toHaveProperty("adminName", "Seth");
    expect(audits[1]).toHaveProperty("action", "Added Product");
    expect(audits[1]).toHaveProperty("timeStamp");

    done();
});


test("addUser", async(done) => {
     // Initially, no user should exist
     let userExists = await findUser("testuser1", "1234");
     expect(userExists.access).toBe(false);
 
     // Add a new user, should be successful
     expect(await addUser("Test", "User", "testuser@gmail.com", "One Trinity Place", "United States", "Texas", "testuser2", "1234")).toBe(true);
     
     // Attempt to add the same user again, should fail because username is already taken
     expect(await addUser("Test", "User", "testuser@gmail.com", "One Trinity Place", "United States", "Texas", "testuser2", "1234")).toBe(false);
 
     // Check if the user exists in the database
     userExists = await findUser("testuser2", "1234");
     expect(userExists.access).toBe(true);
 
     done();
});

test("findUser", async (done) => {
    // Start by adding test user to database
    expect(await addUser("Test","User","testuser@gmail.com","One Trinity Place","United States","Texas","testuser1","1234")).toBe(true);
    // Attempt to find that test user in database, should be successful
    const user = await findUser("testuser1","1234");
    expect(user.access).toBe(true);

    // Attempt to find user that is not in the database, should fail
    const nonUser = await findUser("testuser2","4321");
    expect(nonUser.access).toBe(false);

    done();
});

test("deleteAudit", async (done) => {
    // Audits should be empty before any adds
    let audits = await auditProducts();
    expect(audits.length).toBe(0);

    // Add product audit
    expect(await addAudit("testProduct1","testAdmin1","Add product")).toBe(true);
    let audits2 = await auditProducts();
    expect(audits2.length).toBe(1);

    // Attempt to delete testProduct1 from database, should be successful
    expect(await deleteAudit("testProduct1")).toBe(true);
    audits = await auditProducts();
    expect(audits.length).toBe(0);

    // Attempt to delete product that is not in the database, this should be unsuccessful
    expect(await deleteAudit("testProduct1")).toBe(false);
    
    done();
});
//filtering tests 
describe('Search Filtering Functionality', () => {
    test('filter products by Ferret type', async () =>{
       // Define a mock request object with the necessary properties
       const req = {
        method: 'POST',
        url: '/pages/products',
        body: { animal: 'Ferret' },
    };
    // Send the mock request to the app and capture the response
    const response = await request(app)
    .post(req.url)
    .send(req.body);

    // Assert that the response status is 200
    expect(response.status).toBe(200);
})
    test('filter products by bird type', async () =>{
        const mockProducts = [
            { name: 'Birdcage', tags: ['enclosure', 'expensive'], category: 'Birds' },
            { name: 'Bowtie', tags: ['cool', 'clothing', 'fancy'], category: 'Birds' },
            { name: 'Bird Food', tags: ['food', 'expensive'], category: 'Birds' },
            { name: 'Bird Toy', tags: ['toys', 'fancy'], category: 'Birds' },
            { name: 'seed', tags: ['seed', 'food'], category: 'Birds' },
            { name: 'Fancy Bowtie', tags: ['cool', 'clothing', 'expensive', 'fancy'], category: 'Birds' },
        ];
        const fetchProductsMock = jest.spyOn(productController, 'fetchProducts');
        fetchProductsMock.mockResolvedValue([...mockProducts]);
       // Define a mock request object with the necessary properties
       const req = {
        method: 'POST',
        url: '/pages/products',
        body: { animal: 'Birds' },
    };
    // Send the mock request to the app and capture the response
    const response = await request(app)
    .post(req.url)
    .send(req.body);

    // Assert that the response status is 200
    expect(response.status).toBe(200);
    console.log(response.body.products);
    // Assert that the response contains the expected products
    //expect(response.body.products).toEqual(mockProducts);
    // Restore the original implementation of fetchProducts
    fetchProductsMock.mockRestore();
    });


// Executes after all tests have been finished
afterAll(async (done) => {
    // Closes connection to and drops memory database
    await closeDatabase();
    done();
},10000)});
