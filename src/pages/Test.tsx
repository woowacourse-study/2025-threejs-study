import Profile from '../components/Profile';

const PROFILE = [
  {
    name: 'Blue',
    imgUrl: 'https://avatars.githubusercontent.com/u/168459001?v=4',
    linkUrl: 'https://github.com/hanheel/',
  },
  {
    name: 'Sangchu',
    imgUrl: 'https://avatars.githubusercontent.com/u/80993302?v=4',
    linkUrl: 'https://github.com/sanghee01/',
  },
  {
    name: 'Camel',
    imgUrl: 'https://avatars.githubusercontent.com/u/141295691?v=4',
    linkUrl: 'https://github.com/dev-dino22/',
  },
  {
    name: 'Diane',
    imgUrl: 'https://avatars.githubusercontent.com/u/141714293?v=4',
    linkUrl: 'https://github.com/Daeun-100/',
  },
  {
    name: 'Jenna',
    imgUrl: 'https://avatars.githubusercontent.com/u/106021313?v=4',
    linkUrl: 'https://github.com/JeLee-river/',
  },
];

const Test = () => {
  return (
    <div>
      <h1>Test Component</h1>
      {PROFILE.map((profile, index) => (
        <Profile
          key={index}
          name={profile.name}
          imgUrl={profile.imgUrl}
          linkUrl={profile.linkUrl}
        />
      ))}
    </div>
  );
};
export default Test;
