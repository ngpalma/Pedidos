import { merge, get } from "lodash";
import { getUserBySessionToken } from "../handlers/usersHandlers";

// Verifica si el usuario actual que realiza la solicitud es el propietario del recurso
export const isOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id");

    if (!currentUserId) {
      return res.sendStatus(403);
    }

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// Verificar si un usuario está autenticado antes de permitir el acceso
export const isAuthenticated = async (req, res, next) => {
  try {
    const sessionToken = req.cookies["SPLENDID-AUTH"];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.sendStatus(403);
    }

    merge(req, { identity: existingUser });

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
