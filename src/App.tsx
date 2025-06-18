import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
import SceneCard from "./components/sceneCard/SceneCard";

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <SceneCard imageSrc="/scene-1.png" name="Scene 1" />
    </>
  );
};

export default App;
