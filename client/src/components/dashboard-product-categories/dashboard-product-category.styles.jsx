import styled from "styled-components";
import { DashboardContentTitle } from "../../pages/dashboard/dashboard.styles";
import Skeleton from "../skeleton/skeleton.component";

export const PageHeading = styled(DashboardContentTitle)`
  @media only screen and (max-width: 350px) {
    &:before {
      width: 130px;
      margin-left: -65px;
    }
  }
`;

export const CategoriesList = styled.div`
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;

  @media only screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

export const CategoryEntrySkeleton = styled(Skeleton)`
  width: 31.33%;
  height: 290px;
  margin: 0 0.7rem 0.9rem;
  flex-grow: 1;

  @media only screen and (max-width: 900px) {
    width: 45%;
  }

  @media only screen and (max-width: 700px) {
    width: 100%;
    margin: 0 0 45px;
  }
`;

export const NoCategoriesText = styled.p`
  font-size: 18px;
  text-align: center;
  font-weight: bold;
  letter-spacing: 1.5px;
  min-height: 225px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
