import PropTypes from "prop-types";
import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";

import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase_config";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const signInWithFacebook = () => {
        setLoading(true);
        return signInWithPopup(auth, facebookProvider);
    };
    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const handleUpdateProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email: userEmail };
            console.log("Changed User", currentUser);
            setUser(currentUser);
            setLoading(false);

            if (currentUser) {
                axios
                    .post("http://localhost:5000/jwt", loggedUser, {
                        withCredentials: true,
                    })
                    .then((res) => {
                        console.log("token response", res.data);
                    });
            } else {
                axios
                    .post("http://localhost:5000/logout", loggedUser, {
                        withCredentials: true,
                    })
                    .then((res) => {
                        console.log(res.data);
                    });
            }
        });
        return () => {
            unSubscribe();
        };
    }, [user?.email]);

    const authInfo = {
        createUser,
        logIn,
        signInWithGoogle,
        user,
        logOut,
        handleUpdateProfile,
        loading,
        signInWithFacebook,
    };
    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
export default AuthProvider;
