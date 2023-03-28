const dev = {
  serverURL: "http://192.168.1.32:8080",
  nginxURL: "http://192.168.1.32/uploads/"
}

const prod = {
  serverURL: "http://192.168.1.218:8080",
  nginxURL: "http://192.168.1.218/uploads/"
}

export const serverURL = prod.serverURL;
export const nginxURL = prod.nginxURL;