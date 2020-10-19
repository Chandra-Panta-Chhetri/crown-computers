import styled from "styled-components";
import { secondaryColor } from "../../global.styles";

export const DashboardContainer = styled.article`
  display: flex;
  flex-direction: column;
`;

export const DashboardContent = styled.section`
  margin-top: 80px;
  position: relative;
  left: -20px;
`;

export const DashboardContentTitle = styled.h3`
  font-size: 35px;
  margin: 10px 0 10px;
  text-align: center;
  letter-spacing: 0.2rem;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    width: 60px;
    bottom: 0;
    left: 50%;
    margin-left: -30px;
    border-bottom: 2px solid ${secondaryColor};
  }
`;
