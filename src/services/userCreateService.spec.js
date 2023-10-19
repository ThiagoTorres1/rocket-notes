const UserCreateService = require("./userCreateService")
const UserRepositoryInMemory = require("../repositories/userRepositoryInMemory")
const AppError = require("../utils/AppError")


describe("UserCreateService", () => {
  let userRepositoryInMemory = null
  let userCreateService = null;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    userCreateService = new UserCreateService(userRepositoryInMemory)
  })

  it("user should be create", async () => {
    const user = {
      name: "User Teste",
      email: "user@test.com",
      password: "123"
    }
  
    const userCreated = await userCreateService.execute(user)
  
    expect(userCreated).toHaveProperty("id")
  })

  it("user couldn't be create with exists email", async () => {
    const user1 = {
      name: "User teste 1",
      email: "user@teste.com",
      password: "123"
    }

    const user2 = {
      name: "User teste 2",
      email: "user@teste.com",
      password: "456"
    }

    await userCreateService.execute(user1)
    await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError('Este e-mail já está cadastrado.'))
  })
})
