import { useTranslation } from "next-i18next";

import * as Styled from "./styled";

export interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const { t } = useTranslation("layout");

  const siteName = process.env.SITE_NAME;

  return (
    <Styled.Wrapper className={className}>
      {t("footer.copyright", { siteName })}
    </Styled.Wrapper>
  );
};
