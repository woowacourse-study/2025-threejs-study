import SceneCard from '../components/sceneCard/SceneCard';

const Test = () => {
  return (
    <div>
      <h1>Test Component</h1>
      <p>This is a test component to verify the setup.</p>
      <SceneCard
        imageSrc="/scene-1.png"
        name="Scene 1"
        sceneUrl="/scenes/bass.html"
      />
    </div>
  );
};
export default Test;
