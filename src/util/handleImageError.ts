export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement>,
  defaultImageSrc: string
) => {
  event.currentTarget.src = defaultImageSrc;
};
