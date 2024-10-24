import styles from "./Alert.module.css";
function Alert({ children }: { children: React.ReactNode }) {
  return <p className={styles.alert}>{children}</p>;
}

export default Alert;
