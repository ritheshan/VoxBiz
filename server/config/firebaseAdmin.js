import admin from "firebase-admin";
import fs from "fs";


let serviceAccount;
console.log("Secrets directory:", fs.existsSync("/etc/secrets"));
console.log("Secret files:", fs.existsSync("/etc/secrets/firebase-service-account-credentials.json"));
if (process.env.NODE_ENV === "production") {
  // ✅ Render Secret File location
  serviceAccount = JSON.parse(
    fs.readFileSync(
      "/etc/secrets/firebase-service-account-credentials.json",
      "utf8"
    )
  );
} else {
  // ✅ Local development file (gitignored)
  serviceAccount = JSON.parse(
    fs.readFileSync(
      new URL("../etc/secrets/firebase-service-account-credentials.json", import.meta.url),
      "utf8"
    )
  );
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;