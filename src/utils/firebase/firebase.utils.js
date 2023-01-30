import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB8r82C5BzQPn208UEt4UZQlY8PtG4_yU8",
    authDomain: "crwn-clothing-db-67f53.firebaseapp.com",
    projectId: "crwn-clothing-db-67f53",
    storageBucket: "crwn-clothing-db-67f53.appspot.com",
    messagingSenderId: "515226332501",
    appId: "1:515226332501:web:a30d61487a47c59e55d3dc"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const singInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

  export const addCollectionAndDocuments = async (
    collectionKey, 
    objectsToAdd,
    field = 'title' //or pass it dynamically
  ) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
      const docRef = doc (collectionRef, object[field].toLowerCase());
      batch.set(docRef, object);
    });

    await batch.commit();
    //console.log('done');
  }

  export const getCategriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
      const { title, items } = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});

    return categoryMap;
  }

  export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}
  ) => {

    if (!userAuth) return;

    const userDocRef = doc (db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { 
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  }

  export const signinAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
  }

  export const signOutUser = async () => await signOut(auth);

  export const onAuthStateChangedListener = (callback) => 
  onAuthStateChanged(auth, callback);