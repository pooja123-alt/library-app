import { Stack } from "expo-router";
import Navbar from "./Screen/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar/>
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}