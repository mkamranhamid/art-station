import { auth, database, firestore } from "../config/firebase"

export async function createUser(userCredentials) {
    try {
        const { email, password } = userCredentials;
        const { user: { uid } } = await auth.createUserWithEmailAndPassword(email, password);
        const newUser = { ...userCredentials, uid, status: "pending" };
        delete newUser.password;
        addUser(newUser)
        return newUser;
    } catch (err) {
        throw err
    }
}

function addUser(user) {
    let userRef = firestore.doc(`users/${user.uid}`);
    userRef.set(user);
}

export function updateUser(user) {
    let userRef = firestore.collection('users').doc(user.uid);
    userRef.update(user);
}

export async function getUser(uid) {
    try {
        const user = await firestore.doc(`users/${uid}`).get();
        if (!user.exists) {
            throw new Error('Error: User dont exist in our database');
        }
        return user.data();
    } catch (err) {
        throw err;
    }
}

export async function login(userCredentials) {
    try {
        const { email, password } = userCredentials;
        const { user: { uid } } = await auth.signInWithEmailAndPassword(email, password);
        const loggedInUser = await getUser(uid)
        return loggedInUser;
    } catch (err) {
        throw err
    }
}
