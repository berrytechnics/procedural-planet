import { Html, useProgress } from "@react-three/drei";

export default function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return (
    <Html style={{ color: "yellow" }} center>
      {progress} % loaded
    </Html>
  );
}
