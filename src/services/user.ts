import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../connection/firebase/firebaseConfig";

export const createUserFirebase = async (emailUser, passwordUser) => {
    try {
        const userCredential: any = await createUserWithEmailAndPassword(
            auth,
            emailUser,
            passwordUser
        );
        const credentials = userCredential.user;
        return credentials;
    } catch (error) {
        return error;
    }
};

// export const createUserFirebase = async (emailUser, passwordUser) => {
//     try {
//         const auth = getAuth();
//         createUserWithEmailAndPassword(auth, emailUser, passwordUser)
//             .then((userCredential) => {
//                 // Signed in
//                 const user = userCredential.user;
//                 return user;
//                 // ...
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 // ..
//             });
//     } catch (error) {
//         return error
//     }
// };
