const {addProduct, fetchProducts, addAudit, auditProducts, deleteProduct} = require('./controllers/productController');
const {addUser, findUser} = require('./controllers/userController');
const {connectMongoMemory, closeDatabase, dropCollections} = require('./memoryDatabase');

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
    prods = await fetchProducts();
    expect(prods.length).toBe(1); 

    // Try to add duplicate product, should fail to add
    expect(await addProduct("Toothbrush",10.99,["Grooming"],"Ferret","","It's a toothbrush!")).toBe(false); 

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

    done();
});


test("addUser", async(done) => {
    // Attempt to add test user to database, should be successful
    expect(await addUser("Test","User","testuser@gmail.com","One Trinity Place","United States","Texas","testuser1","1234")).toBe(true);
    // Attempt to add duplicate test user to database, should fail because username is already in database
    expect(await addUser("Test","User","testuser@gmail.com","One Trinity Place","United States","Texas","testuser1","1234")).toBe(false);
    
    done();
});

test("findUser", async (done) => {
    // Start by adding test user to database
    expect(await addUser("Test","User","testuser@gmail.com","One Trinity Place","United States","Texas","testuser1","1234")).toBe(true);
    // Attempt to find that test user in database, should be successful
    const user = await findUser("testuser1","1234");
    expect(user.pw).toBe(true);

    // Attempt to find user that is not in the database, should fail
    const nonUser = await findUser("testuser2","4321");
    expect(nonUser.pw).toBe(false);

    done();
});

// Executes after all tests have been finished
afterAll(async (done) => {
    // Closes connection to and drops memory database
    await closeDatabase();
    done();
},10000);
