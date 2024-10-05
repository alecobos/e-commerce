import usersManager from "../data/UsersManager.js";

async function getAllUsers(req, res, next) {
  try {
    let response;
    response = await usersManager.readAll();
    if (response.length > 0) {
      return res.status(200).json({ message: "USERS READ", response });
    } else {
      const error = new Error("USER NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}


async function getUser(req, res, next) {
  try {
    const { uid } = req.params;
    const response = await usersManager.read(uid);
    if (response) {
      return res.status(200).json({ message: "USER READ", response });
    } else {
      const error = new Error("USER NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const { email, password } = req.body;
    let { userName, rol, photo } = req.body;
    if (!rol) {
      rol = 0;
    }
    if (!photo) {
      photo =
        "https://i.pinimg.com/474x/5a/1b/1e/5a1b1e32639c6210416804dc7a93ef8e.jpg";
    }
    const responseManager = await usersManager.create({
      email,
      password,
      userName,
      rol,
      photo,
    });
    return res
      .status(201)
      .json({ message: "USER CREATED", response: responseManager });
  } catch (error) {
    return next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const { uid } = req.params;
    const newData = req.body;
    const responseManager = await usersManager.update(uid, newData);
    
    return res
      .status(200)
      .json({ message: "USER UPDATED", response: responseManager });
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ message: error.message });
    }
    return next(error); // Si es otro error, pasa al siguiente middleware
  }
}


async function destroyUser(req, res, next) {
  try {
    const { uid } = req.params;
    const responseManager = await usersManager.delete(uid);
    if (!responseManager) {
      const error = new Error(`User with id ${uid} not found`);
      error.statusCode = 404;
      throw error;
    }
    return res
      .status(200)
      .json({ message: "USER DELETED", response: responseManager });
  } catch (error) {
    return next(error);
  }
}

const registerView = async (req, res, next) => {
  try {
    const users = await usersManager.readAll()
      return res.render("register", { users })
  } catch (error) {
      next(error)
  }
}


async function showOneUser(req, res, next) {
  //res es el objeto de respuesta a enviar al cliente
  try {
    const { uid } = req.params;
    const response = await usersManager.read(uid);
    //response es la respuesta que se espera del manager (para leer un producto)
    if (response) {
      return res.render("oneuser", { one: response })
    } else {
      const error = new Error("USER NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

export { getAllUsers, getUser, createUser, updateUser, destroyUser, registerView, showOneUser };
