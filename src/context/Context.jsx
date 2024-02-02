import { onAuthStateChanged } from "firebase/auth";
import { createContext } from "preact";
import { useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import Loading from "../components/loading/Loading";
import { collection, onSnapshot, query } from "firebase/firestore";

const BlogContext = createContext();
const Context = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [publish, setPublish] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  useEffect(() => {
    // setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [currentUser]);

  useEffect(() => {
    const getUsers = () => {
      const postRef = query(collection(db, "users"));
      onSnapshot(postRef, (snapshot) => {
        setAllUsers(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
        setUserLoading(false);
      });
    };
    getUsers();
  }, []);
  // console.log(allUsers)
  return (
    <BlogContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        allUsers,
        userLoading,
        publish,
        setPublish,
      }}
    >
      {loading ? <Loading /> : children}
    </BlogContext.Provider>
  );
};

export default Context;

export const Blog = () => useContext(BlogContext);
