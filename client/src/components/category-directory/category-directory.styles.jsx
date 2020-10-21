import styled from "styled-components";
import { secondaryColorLight, mainColorLight } from "../../global.styles";

export const CategoryImage = styled.div`
  width: 100%;
  height: 100%;
  background-position: center center;
  background-size: cover;
  background-image: ${(props) => `url(${props.imageUrl})`};
`;

export const DirectoryContent = styled.div`
  height: 90px;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  position: absolute;
  background-color: ${secondaryColorLight};
  opacity: 0.8;
  border-radius: 6px;
  width: 20%;
  text-align: center;
`;

export const CategoryDirectoryContainer = styled.div`
  width: 25%;
  height: 240px;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0 7.5px 15px;
  overflow: hidden;
  border-radius: 6px;

  &:hover {
    cursor: pointer;
    & ${CategoryImage} {
      transform: scale(1.6);
      transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }

    & ${DirectoryContent} {
      opacity: 1;
    }
  }
`;

export const CategoryName = styled.h1`
  font-weight: bold;
  margin-bottom: 1px;
  font-size: 22px;
  color: ${mainColorLight};
  text-transform: uppercase;
`;

export const DirectorySubtitle = styled.p`
  font-weight: lighter;
  font-size: 16px;
  margin-top: 4px;
`;
