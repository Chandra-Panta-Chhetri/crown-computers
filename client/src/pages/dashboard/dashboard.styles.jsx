import styled from "styled-components";

export const DashboardContainer = styled.article`
  display: flex;
  flex-direction: column;
`;

export const DashboardContent = styled.section`
  margin-top: 80px;
`;

export const DashboardContentTitle = styled.h3`
  font-size: 35px;
  margin: 10px 0 20px;
  text-align: center;
  letter-spacing: 0.2rem;
  position: relative;
  padding-bottom: 3px;

  &:before {
    content: "";
    position: absolute;
    width: ${(props) =>
      props.underlineWidth ? `${props.underlineWidth}px` : "60px"};
    bottom: 0;
    left: 50%;
    margin-left: ${(props) =>
      props.underlineWidth ? `${(props.underlineWidth / 2) * -1}px` : "-30px"};
    border-bottom: 2px solid ${(props) => props.theme.secondary};
  }

  @media only screen and (max-width: 450px) {
    letter-spacing: 0;
  }
`;
