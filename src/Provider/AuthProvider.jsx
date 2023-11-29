import PropTypes from "prop-types";

import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase_config";
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
import useAxiosPublic from "../hook/useAxiosPublic";
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

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
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // get token and store client
                const userInfo = { email: currentUser.email };
                axiosPublic.post("/jwt", userInfo).then((res) => {
                    if (res.data.token) {
                        localStorage.setItem("access-token", res.data.token);
                        setLoading(false);
                    }
                });
            } else {
                // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
                localStorage.removeItem("access-token");
                setLoading(false);
            }
        });
        return () => {
            return unsubscribe();
        };
    }, [axiosPublic]);

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
