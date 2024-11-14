import Image from "next/image";
import styles from "./page.module.css";
import MyList from "./mylist";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MyList />
    </div>
  );
}
