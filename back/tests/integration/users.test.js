const request = require('supertest');
const loginUser = require('../../routes/helpers/loginUser');

const route = '/api/users';
const { appServer } = require('../../server');

describe('api/users', () => {
  beforeEach(() => { appServer });
  afterEach(() => { appServer.close() })

  // Test
  describe('GET /test', () => {
    it('should return test message', async () => {
      const res = await request(appServer).get(`${route}/test`);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({"msg": "users work"});
    })
  })

  // Current
  describe('GET /current', () => {
    it('should return 401 if user is not logged in', async () => {
      const res = await request(appServer)
        .get(`${route}/current`)
      expect(res.status).toBe(401);
    })
  })

  describe('GET /current', () => {
    it('should return user object if user is logged in', async () => {
      const token = loginUser();

      const res = await request(appServer)
        .get(`${route}/current`)
        .set('Authorization', token)
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        "id": "5dd96782fd4aeb0a2444fab1",
        "name": "Max",
        "email": "emv3@narod.ru",
        "active": true
      })
    })
  })

  // Login
  describe('POST /login', () => {
    it('should return 200 if user logges in with correct login and password', async () => {
      const res = await request(appServer)
        .post(`${route}/login`)
        .send({email: "emv3@narod.ru", password: "333333"})
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({"success": true});
    })
  })

  describe('POST /login', () => {
    it('should return 400 if user logges in without password', async () => {
      const res = await request(appServer)
        .post(`${route}/login`)
        .send({email: "emv3@narod.ru"})
      expect(res.status).toBe(400);
      expect(res.body).toMatchObject({"password": "Поле Пароль обязательно к заполнению"});
    })
  })

  describe('POST /login', () => {
    it('should return 400 if user logges in without login', async () => {
      const res = await request(appServer)
        .post(`${route}/login`)
        .send({password: "333333"})
      expect(res.status).toBe(400);
      expect(res.body).toMatchObject({"email": "Поле Email обязательно к заполнению"});
    })
  })

  describe('POST /login', () => {
    it('should return 400 if user logges in without login and password', async () => {
      const res = await request(appServer)
        .post(`${route}/login`)
        .send({})
      expect(res.status).toBe(400);
      expect(res.body).toMatchObject({
        "email": "Поле Email обязательно к заполнению",
        "password": "Поле Пароль обязательно к заполнению"
      });
    })
  })

  describe('POST /login', () => {
    it('should return 400 if user logges in with correct login and incorrect password', async () => {
      const res = await request(appServer)
        .post(`${route}/login`)
        .send({email: "emv3@narod.ru", password: "444444"})
      expect(res.status).toBe(400);
      expect(res.body).toMatchObject({"password": "Некорректный пароль"});
    })
  })

  describe('POST /login', () => {
    it('should return 404 if user logges in with incorrect login and correct password', async () => {
      const res = await request(appServer)
        .post(`${route}/login`)
        .send({email: "emv4@narod.ru", password: "333333"})
      expect(res.status).toBe(404);
      expect(res.body).toMatchObject({"userNotFound": "Пользователь не найден"});
    })
  })

  // All users
  describe('GET /all', () => {
    it('should return 200 and user object if user object is in the users array', async () => {
      const token = loginUser();

      const res = await request(appServer)
        .get(`${route}/all`)
        .set('Authorization', token)
      expect(res.status).toBe(200);
      expect(res.body).toContainEqual({
        "active": true,
        "_id": "5dd96782fd4aeb0a2444fab1",
        "name": "Max",
        "email": "emv3@narod.ru",
        "password": "$2a$10$D3CMlipIz5RMEMMjW5SWDOUhId6bOrGKHOtAMDf4OGvVeH5uY5eoe",
        "date": "2019-11-23T17:08:18.787Z",
        "__v": 0
      })
    })
  })

  // Register
  describe('POST /register', () => {
    it('should return 400 if user logges in without name', async () => {
      const res = await request(appServer)
        .post(`${route}/register`)
        .send({email: "emv5@narod.ru", password: "555555", password2: "555555"})
      expect(res.status).toBe(400);
      expect(res.body).toMatchObject({"name": "Поле Имя обязательно к заполнению"});
    })
  })

  describe('POST /register', () => {
    it('should return 400 if user logges in with short name', async () => {
      const res = await request(appServer)
        .post(`${route}/register`)
        .send({name: "a",email: "emv5@narod.ru", password: "555555", password2: "555555"})
      expect(res.status).toBe(400);
      expect(res.body).toMatchObject({"name": "Имя не должно быть короче 2 и длиннее 30 знаков"});
    })
  })

  describe('POST /register', () => {
    it('should return 400 if user logges in with long name', async () => {
      const res = await request(appServer)
        .post(`${route}/register`)
        .send({
          name: "agfhbfdgnjfdghjndfghmjghjmdghmkdghmdghmdghmdghmdghmdghmdghmdghmdghmdghm",
          email: "emv5@narod.ru",
          password: "555555",
          password2: "555555"})
      expect(res.status).toBe(400);
      expect(res.body).toMatchObject({"name": "Имя не должно быть короче 2 и длиннее 30 знаков"});
    })
  })

  describe('POST /register', () => {
    it('should return 400 if user registers with existing email', async () => {
      const res = await request(appServer)
        .post(`${route}/register`)
        .send({name: "Maximus", email: "emv3@narod.ru", password: "555555", password2: "555555"})
      expect(res.status).toBe(400);
      expect(res.body).toMatchObject({"email": "Такой Email уже существует"});
    })
  })

  describe('POST /register', () => {
    it('should return 400 if user logges in without email', async () => {
      const res = await request(appServer)
        .post(`${route}/register`)
        .send({name: "Maximus", password: "555555", password2: "555555"})
      expect(res.status).toBe(400);
      expect(res.body).toMatchObject({"email": "Поле Email обязательно к заполнению"});
    })
  })

  describe('POST /register', () => {
    it('should return 400 if user logges in with incorrect email', async () => {
      const res = await request(appServer)
        .post(`${route}/register`)
        .send({name: "Maximus", email: "enm4.ru", password: "555555", password2: "555555"})
      expect(res.status).toBe(400);
      expect(res.body).toMatchObject({"email": "Некорректный Email"});
    })
  })

  describe('POST /register', () => {
    it('should return 400 if user logges in without password', async () => {
      const res = await request(appServer)
        .post(`${route}/register`)
        .send({name: "Maximus", email: "emv5@narod.ru", password2: "555555"})
      expect(res.status).toBe(400);
      expect(res.body).toMatchObject({
        "password": "Пароль не должен быть короче 6 и длиннее 30 знаков", 
        "password2": "Пароли не совпадают"
      });
    })
  })

  describe('POST /register', () => {
    it('should return 400 if user logges in with short password', async () => {
      const res = await request(appServer)
        .post(`${route}/register`)
        .send({name: "Maximus", email: "emv5@narod.ru", password: "55555", password2: "555555"})
      expect(res.status).toBe(400);
      expect(res.body).toMatchObject({
        "password": "Пароль не должен быть короче 6 и длиннее 30 знаков", 
        "password2": "Пароли не совпадают"
      });
    })
  })

  describe('POST /register', () => {
    it('should return 400 if user logges in with long password', async () => {
      const res = await request(appServer)
        .post(`${route}/register`)
        .send({
          name: "Maximus",
          email: "emv5@narod.ru",
          password: "agfhbfdgnjfdghjndfghmjghjmdghmkdghmdghmdghmdghmdghmdghmdghmdghmdghmdghm",
          password2: "555555"
        })
      expect(res.status).toBe(400);
      expect(res.body).toMatchObject({
        "password": "Пароль не должен быть короче 6 и длиннее 30 знаков", 
        "password2": "Пароли не совпадают"
      });
    })
  })

  describe('POST /register', () => {
    it('should return 400 if user logges in without password2', async () => {
      const res = await request(appServer)
        .post(`${route}/register`)
        .send({name: "Maximus", email: "emv5@narod.ru", password: "555555"})
      expect(res.status).toBe(400);
      expect(res.body).toMatchObject({"password2": "Поле Подтверждение пароля обяъательно к заполнению"});
    })
  })

  describe('POST /register', () => {
    it('should return 400 if user logges in with short password2', async () => {
      const res = await request(appServer)
        .post(`${route}/register`)
        .send({name: "Maximus", email: "emv5@narod.ru", password: "555555", password2: "55555"})
      expect(res.status).toBe(400);
      expect(res.body).toMatchObject({"password2": "Пароли не совпадают"});
    })
  })

  describe('POST /register', () => {
    it('should return 400 if user logges in with long password2', async () => {
      const res = await request(appServer)
        .post(`${route}/register`)
        .send({
          name: "Maximus",
          email: "agfhbfdgnjfdghjndfghmjghjmdghmkdghmdghmdghmdghmdghmdghmdghmdghmdghmdghm",
          password: "agfhbfdgnjfdghjndfghmjghjmdghmkdghmdghmdghmdghmdghmdghmdghmdghmdghmdghm",
          password2: "555555"
        })
      expect(res.status).toBe(400);
      expect(res.body).toMatchObject({"password": "Пароль не должен быть короче 6 и длиннее 30 знаков"});
    })
  })
})