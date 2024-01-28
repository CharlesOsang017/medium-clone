import { onAuthStateChanged } from "firebase/auth";
import { createContext } from "preact";
import { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import Loading from "../components/loading/Loading";

const BlogContext = createContext();
const Context = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(false);
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
  return (
    <BlogContext.Provider value={{ currentUser, setCurrentUser }}>
      {loading ? <Loading /> : children}
    </BlogContext.Provider>
  );
};

export default Context;

export const Blog = () => useContext(BlogContext);
