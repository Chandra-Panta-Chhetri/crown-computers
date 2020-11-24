import styled from "styled-components";
import { secondaryColor } from "../../global.styles";

export const BadgeContainer = styled.span`
  font-weight: bold;
  background-color: ${secondaryColor};
  border-radius: 10px;
  color: white;
  font-size: 13px;
  line-height: 1;
  padding: 4px 9px;
  text-align: center;
  white-space: nowrap;
`;
