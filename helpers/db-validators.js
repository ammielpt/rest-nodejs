const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la BD`);
  }
}

//verificar si el correo existe
const verificarEmail = async (correo="") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya existe`);
  }
}

//verificar si el usuario existe
const verificarUsuario = async (id="") => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El usuario con ${id} no existe`);
  }
}

module.exports = { esRolValido,verificarEmail,verificarUsuario};
