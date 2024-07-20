import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import './AdminPage.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersData = [];
      querySnapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() });
      });
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    const userDoc = doc(db, 'users', userId);
    await updateDoc(userDoc, { role: newRole });
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === userId ? { ...user, role: newRole } : user))
    );
  };

  const handleBlockUser = async (userId, blocked) => {
    const userDoc = doc(db, 'users', userId);
    await updateDoc(userDoc, { blocked });
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === userId ? { ...user, blocked } : user))
    );
  };

  const handleDeleteUser = async (userId) => {
    await deleteDoc(doc(db, 'users', userId));
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentUser = auth.currentUser;

  return (
    <div className="admin-page">
      <h1>ניהול משתמשים</h1>
      <input
        type="text"
        placeholder="חיפוש לפי שם"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar-users"
      />
      <div className="user-list">
        {filteredUsers.map((user) => (
          <div key={user.id} className="user-card">
            <p><strong>{user.firstName} {user.lastName}</strong></p>
            <p>{user.email}</p>
            <p>תפקיד: {user.role}</p>
            {user.blocked ? <p>חסום</p> : <p>פעיל</p>}
            <div className="user-actions">
              {user.role !== 'admin' && <button className="action-btn" onClick={() => handleRoleChange(user.id, 'admin')}>הפוך למנהל</button>}
              {user.role === 'admin' && currentUser.uid !== user.id && <button className="action-btn" onClick={() => handleRoleChange(user.id, 'user')}>הסר מנהל</button>}
              {user.role !== 'guide' && <button className="action-btn" onClick={() => handleRoleChange(user.id, 'guide')}>הפוך למדריך</button>}
              {user.role === 'guide' && <button className="action-btn" onClick={() => handleRoleChange(user.id, 'user')}>הסר מדריך</button>}
              {user.blocked ? (
                <button className="action-btn" onClick={() => handleBlockUser(user.id, false)}>בטל חסימה</button>
              ) : (
                <button className="action-btn" onClick={() => handleBlockUser(user.id, true)}>חסום משתמש</button>
              )}
              {currentUser.uid !== user.id && (
                <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>מחק משתמש</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
