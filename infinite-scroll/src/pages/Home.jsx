import React, { useState, useEffect } from "react";
import styles from "../styles/style.module.css";
import Loader from "../components/Loader";
const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://randomuser.me/api/?page=${page}&results=10`)
      .then((res) => res.json())
      .then((data) => {
        setUsers((prevUsers) => {
          return [
            ...new Set([...prevUsers, ...data.results.map((user) => user)]),
          ];
        });
        setHasMore(data.results.length > 0);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }, [page]);

  const observer = React.useRef();
  const lastUserElementRef = React.useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const logout = () => {
    localStorage.removeItem("auth");
    window.location.href = "/";
  };

  return (
    <div className={styles.box}>
      <h2>Users</h2>
      <button className={styles.logout} onClick={logout}>
        Logout
      </button>

      <div className={styles.data}>
        <div className={styles.dataHeader}>
          <button className={styles.dataHeaderItem}>Name</button>
          <button className={styles.dataHeaderItem}>Email</button>
          <button className={styles.dataHeaderItem}>Phone</button>
        </div>
        <div className={styles.dataBody}>
          {users.map((user, index) => {
            if (users.length === index + 1) {
              return (
                <div
                  className={styles.dataItem}
                  key={user.email}
                  ref={lastUserElementRef}
                >
                  <div className={styles.imgDiv}>
                    <div className={styles.dataItemName}>
                      <img src={user.picture.thumbnail} alt="user" />
                    </div>
                    <div className={styles.dataItemNameText}>
                      {user.name.first} {user.name.last}
                    </div>
                  </div>

                  <div className={styles.dataItemEmail}>{user.email}</div>

                  <div className={styles.dataItemPhone}>{user.phone}</div>
                </div>
              );
            } else {
              return (
                <div className={styles.dataItem} key={user.email}>
                  <div className={styles.imgDiv}>
                    <div className={styles.dataItemName}>
                      <img src={user.picture.thumbnail} alt="user" />
                    </div>
                    <div className={styles.dataItemNameText}>
                      Name: {user.name.first} {user.name.last}
                    </div>
                  </div>
                  <div className={styles.dataItemEmail}>
                    Email: {user.email}
                  </div>
                  <div className={styles.dataItemPhone}>
                    Mobile: {user.phone}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className={styles.loader}>{loading && <Loader />}</div>
      <div className={styles.error}>{error && "Something went wrong"}</div>
    </div>
  );
};
export default Home;
