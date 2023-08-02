import admin from 'firebase-admin';
import { serviceAccount } from './serviceAccount';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://page-builder-572dd-default-rtdb.firebaseio.com",
});



export const adminAuth = admin.auth()