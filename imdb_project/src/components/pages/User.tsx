import { useContext } from "react";
import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";
import { UsersContextTypes } from "../../types";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SettingsIcon from "@mui/icons-material/Settings";
import ShareIcon from "@mui/icons-material/Share";
import AppsIcon from "@mui/icons-material/Apps";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UserPage = styled.div`
  background-color: #f5f5f5;
  color: black;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const ProfileHeader = styled.div`
  background-color: #202020;
  color: white;
  padding: 20px 0;
`;

const MainFlex = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 40px;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProfileName = styled.h2`
  font-size: 36px;
  font-weight: 500;
  margin: 0;
`;

const Joined = styled.span`
  font-size: 13px;
  color: #aaa;
  display: flex;
  align-items: center;
  gap: 6px;
  svg {
    font-size: 20px;
    color: #aaa;
  }
`;

const EditProfile = styled.button`
  background-color: #3c3c3c;
  color: #00aaff;
  font-size: 13px;
  border: none;
  border-radius: 16px;
  padding: 10px 10px;
  width: fit-content;
  cursor: pointer;

  &:hover {
    background-color: #4d4d4d;
  }
`;

const RightSideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;

  svg {
    color: white;
    font-size: 18px;
    cursor: pointer;

    &:hover {
      color: #ccc;
    }
  }
`;

const VerticalDivider = styled.div`
  height: 16px;
  width: 1px;
  background-color: #444;
`;

const RightSide = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 100px);
  gap: 10px;
`;

const StatCard = styled.div`
  background-color: #363636;
  padding: 12px;
  border-radius: 6px;
  text-align: center;
`;

const StatLabel = styled.div`
  font-size: 12px;
`;

const StatValue = styled.div`
  font-size: 20px;
    color: #aaa;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #333;
  margin: 0;
  background-color: transparent;
  height: 1px;
`;

const Section = styled.div`
  margin: 20px 40px;
  padding-bottom: 20px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const YellowBar = styled.div`
  width: 4px;
  height: 24px;
  background-color: #f5c518;
  border-radius: 2px;
`;

const TitleText = styled.h3`
  font-size: 26px;
  font-weight: bold;
`;

const Count = styled.span`
  font-size: 14px;
  color: #666;
`;

const SectionArrow = styled(ArrowForwardIosIcon)`
  font-size: 16px !important;
  color: black;
`;

const HorizontalList = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 12px;
  align-items: center;
  justify-content: center;
`;

const EmptyText = styled.div`
  font-size: 14px;
  color: #888;
`;

const User = () => {
  const { loggedInUser } = useContext(UsersContext) as UsersContextTypes;
  const user = loggedInUser!;

  return (
    <UserPage>
      <ProfileHeader>
        <Container>
          <MainFlex>
            <LeftSide>
              <AvatarWrapper>
                <AccountCircleIcon style={{ fontSize: 140, color: "#444" }} />
              </AvatarWrapper>
              <UserInfo>
                <ProfileName>{user.username}</ProfileName>
                <Joined>
                  <CalendarMonthIcon />
                  Joined Jan 2024
                </Joined>
                <EditProfile>Edit profile</EditProfile>
              </UserInfo>
            </LeftSide>

            <RightSideWrapper>
              <IconWrapper>
                <SettingsIcon />
                <VerticalDivider />
                <ShareIcon />
              </IconWrapper>
              <RightSide>
                <StatCard>
                  <StatLabel>Ratings</StatLabel>
                  <StatValue>205</StatValue>
                </StatCard>
                <StatCard>
                  <StatLabel>Watchlist</StatLabel>
                  <StatValue>95</StatValue>
                </StatCard>
                <StatCard>
                  <StatLabel>Lists</StatLabel>
                  <StatValue>0</StatValue>
                </StatCard>
                <StatCard>
                  <StatLabel>More</StatLabel>
                  <AppsIcon style={{ fontSize: "20px", color: "#aaa" }} />
                </StatCard>
              </RightSide>
            </RightSideWrapper>
          </MainFlex>
        </Container>
      </ProfileHeader>

      <Divider />

      <Container>
        <Section>
          <SectionHeader>
            <YellowBar />
            <TitleText>Ratings</TitleText>
            <Count>205</Count>
            <SectionArrow />
          </SectionHeader>
          <HorizontalList>
            <EmptyText>No ratings to display yet.</EmptyText>
          </HorizontalList>
        </Section>

        <Section>
          <SectionHeader>
            <YellowBar />
            <TitleText>Watchlist</TitleText>
            <Count>95</Count>
            <SectionArrow />
          </SectionHeader>
          <HorizontalList>
            <EmptyText>Your watchlist is empty.</EmptyText>
          </HorizontalList>
        </Section>
      </Container>
    </UserPage>
  );
};

export default User;
