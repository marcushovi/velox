import Image from "next/image";
import classes from "./AppLogo.module.css";


function AppLogo() {
  return (
    <Image
      className={classes.invert}
      src="/velox.svg"
      alt="Velox Logo"
      width={100}
      height={37}
      priority
    />
  );
}

export default AppLogo;
