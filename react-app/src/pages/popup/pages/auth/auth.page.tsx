import googleLogo from "@src/assets/img/google-icon.svg";
import { StyledAuthWrapper } from "@pages/popup/components/auth/auth-wrapper";
import { StyledThemeSwitch } from "@pages/popup/components/shared/theme-switch";
import { StyledTitle } from "@pages/popup/components/shared/title-header";
import { StyledGoogleButton, StyledGoogleIconWrapper, StyledGoogleText } from "@pages/popup/components/auth/google";
import { POPUP_HEIGHT, POPUP_POSITION_LEFT, POPUP_POSITION_TOP, POPUP_WIDTH } from "@pages/popup/constant";
import { useContext } from "react";
import { AuthContext } from "@root/utils/core/authentication/authentication";
import { Navigate } from "react-router-dom";

const googleLogin = () => chrome.windows.create({
  url: import.meta.env.VITE_API_URL + "auth/login",
  type: "popup",
  setSelfAsOpener: true,
  width: POPUP_WIDTH,
  height: POPUP_HEIGHT,
  top: POPUP_POSITION_TOP,
  left: POPUP_POSITION_LEFT
});

const AuthPage = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to={"/"} />;
  }

  return (<StyledAuthWrapper
      direction={"column"}
      alignItems={"center"}
      useFlexGap={true}
      spacing={6}>
      <StyledThemeSwitch sx={{ alignSelf: "start" }} />

      <StyledTitle>Witaj w YT Plugin</StyledTitle>

      <StyledGoogleButton onClick={googleLogin}>
        <StyledGoogleIconWrapper>
          <img
            src={googleLogo}
            alt={"Google Logo"}
          />
        </StyledGoogleIconWrapper>

        <StyledGoogleText>Zaloguj się przez Google</StyledGoogleText>
      </StyledGoogleButton>
    </StyledAuthWrapper>
  );
};
export default AuthPage;
