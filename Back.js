import React from "react";
import { SvgXml } from "react-native-svg";

const logo = `
<svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 1.64001L2 8.14001" stroke="#E2E2E2" stroke-width="3" stroke-linecap="round"/>
<path d="M12 15.64L2 8.64001" stroke="#E2E2E2" stroke-width="3" stroke-linecap="round"/>
</svg>
`;

const BackLogo = () => {
  const BackLogoSvg = () => <SvgXml xml={logo} width="30%" height="30%" />;
  return <BackLogoSvg />;
};

export default BackLogo;
