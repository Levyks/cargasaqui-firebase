import * as functions from "firebase-functions";
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

initializeApp({
    credential: applicationDefault()
});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase!");
});

export const setAdmin = functions.https.onRequest(async (request, response) => {
    const auth = getAuth();
    const user = await auth.getUserByEmail('marcio.levy20@gmail.com');
    response.send(user.customClaims);
});