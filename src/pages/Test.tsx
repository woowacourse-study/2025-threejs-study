import SceneCard from '../components/sceneCard/SceneCard';
import Profile from '../components/Profile';
import { PROFILES } from '../consts';

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
      {PROFILES.map((profile) => (
        <Profile
          key={profile.id}
          name={profile.name}
          imgUrl={profile.imgUrl}
          linkUrl={profile.linkUrl}
        />
      ))}
    </div>
  );
};
export default Test;
