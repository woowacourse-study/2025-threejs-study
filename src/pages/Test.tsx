import Profile from '../components/Profile';
import { PROFILES } from '../consts';

const Test = () => {
  return (
    <div>
      <h1>Test Component</h1>
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
