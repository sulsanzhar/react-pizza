import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={470}
    viewBox="0 0 280 470"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="306" rx="10" ry="10" width="280" height="82" />
    <rect x="129" y="410" rx="30" ry="30" width="150" height="44" />
    <rect x="0" y="419" rx="5" ry="5" width="35" height="27" />
    <circle cx="133" cy="119" r="120" />
    <rect x="0" y="267" rx="10" ry="10" width="280" height="23" />
  </ContentLoader>
);

export default Skeleton;