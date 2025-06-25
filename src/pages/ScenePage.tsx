interface ScenePageProps {
  sceneUrl: string;
}

const ScenePage = ({ sceneUrl }: ScenePageProps) => {
  return (
    <iframe
      src={sceneUrl}
      style={{
        width: '100vw',
        height: '100vh',
        border: 'none',
      }}
      title="bass scene"
    />
  );
};

export default ScenePage;
