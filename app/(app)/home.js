import { View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../store";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ChatList from "../../components/ChatList";
import { getDocs, query, where } from "firebase/firestore";
import { usersRef } from "../../config/firebaseConfig";

// todo
// * functions that are realted to db should be defined outside component file
// * logic in return is incorect
// * we need loading state when fetching for users
// * we need empty state if no user

export default function Home() {
  const { logout, user } = useAuthStore();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (user?.uid) getUsers();
  }, []);
  const getUsers = async () => {
    // fetch users
    const q = query(usersRef, where("userId", "!=", user?.uid));

    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });

    setUsers(data);
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />

      {users.length > 0 ? (
        <ChatList currentUser={user} users={users} />
      ) : (
        <View className="flex items-center" style={{ top: hp(30) }}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
}
