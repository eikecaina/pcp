import { useTranslation } from "next-i18next";

import { useCustomLogic } from "./hooks";
import * as Styled from "./styled";

export interface ComponentProps {
  className?: string;
}

export const Component: React.FC<ComponentProps> = ({ className }) => {
  const { t } = useTranslation("common"); // Carrega o arquivo de tradução "common.json"

  // Hooks deixam os componentes mais legíveis,
  // e podem ser utilizados para abstrair e reutilizar lógicas comuns
  const state = useCustomLogic();

  return (
    <Styled.Wrapper className={className}>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <span>
        {t("component")}
        {/* tradução da chave "component" do arquivo carregado */}
      </span>
    </Styled.Wrapper>
  );
};
