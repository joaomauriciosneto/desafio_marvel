import axios from "axios";
import md5 from "md5";

const publicKey = "38160070c67f4d7549af404b7069a172";
const privateKey = "871bc31d96c00ac9acb24afd26ba9757e2ae7aac";
const time = Number(new Date());

// código de acesso.
const hash = md5(time + privateKey + publicKey);

const api = axios.create({
  baseURL: "http://gateway.marvel.com/v1/public/",
  params: {
    ts: time,
    apikey: publicKey,
    // como a atributo requerido, hash, tem o mesmo nome da constante,
    // basta colocar hash... ao invés de "hash: hash"
    hash,
  },
});

export default api;
