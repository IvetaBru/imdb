import styled from "styled-components";
import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext";
import { UsersContextTypes } from "../../types";
import SettingsIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";

const Page = styled.div`
  background-color: #f5f5f5;
  color: black;
`;

const Header = styled.header`
  background-color: #202020;
  color: white;
  padding: 32px 0 20px 0;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 40px;
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Title = styled.h2`
  font-size: 40px;
  font-weight: 500;
  margin: 0;
`;

const Meta = styled.div`
  font-size: 13px;
  color: #aaa;
  margin-top: 6px;

  span {
    color: #3ca4ff;
    cursor: pointer;
  }
`;

const Description = styled.p`
  font-size: 14px;
  color: #ccc;
  margin-top: 12px;
  max-width: 700px;
`;

const ControlsWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ControlIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  cursor: pointer;

  svg {
    color: white;
    font-size: 18px;
  }

  &:hover svg {
    color: #ccc;
  }

  border-right: 1px solid #444;
  padding-right: 10px;

  &:last-child {
    border-right: none;
  }
`;

const Toggle = styled.div`
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Switch = styled.span`
  background: #444;
  width: 32px;
  height: 18px;
  border-radius: 9px;
  display: inline-block;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 14px;
    height: 14px;
    background: white;
    border-radius: 50%;
  }
`;

const CreateListButton = styled.button`
  background-color: #f5c518;
  color: black;
  font-weight: 600;
  padding: 8px 14px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #e4b800;
  }

  span {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    line-height: 16px;
  }

  svg {
    font-size: 20px;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #333;
  margin: 0;
`;

const ActionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: #fff; */
  padding: 20px 0;
  /* border-bottom: 1px solid #ccc; */
`;

const TitleCount = styled.span`
  font-weight: 600;
  font-size: 14px;
`;

const SortControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;

  span {
    font-weight: 500;
  }
`;

const SortButton = styled.button`
  background-color: #0657c9;
  color: white;
  border: none;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const SortSelect = styled.span`
  color: #0657c9;
  font-weight: 500;
  cursor: pointer;
`;

const ArrowUp = styled.span`
  font-size: 16px;
  color: #0657c9;
`;

const ViewIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    font-size: 20px;
    color: #999;
    cursor: pointer;

    &.selected {
      color: #444;
    }
  }
`;

const EmptyText = styled.div`
  font-size: 14px;
  color: #888;
`;

const Content = styled.div`
  padding: 40px 0;
  min-height: 500px;
  margin-bottom: 30px;
`;

const Watchlist = () => {
  const { loggedInUser } = useContext(UsersContext) as UsersContextTypes;
  const user = loggedInUser!;

  return (
    <Page>
      <Header>
        <Container>
          <HeaderTop>
            <div>
              <Title>Your Watchlist</Title>
              <Meta>
                by <span>{user.username}</span> • Created 1 year ago • Modified 3 days ago
              </Meta>
              <Description>
                Your Watchlist is the place to track the titles you want to watch.
                You can sort your Watchlist by the IMDb rating or popularity score
                and arrange your titles in the order you want to see them.
              </Description>
            </div>

            <ControlsWrap>
              <Controls>
                <ControlIcon><SettingsIcon /> Edit</ControlIcon>
                <Toggle>
                  Public
                  <Switch /> Off
                </Toggle>
                <ControlIcon><CloudDownloadIcon /> Export</ControlIcon>
                <ControlIcon><ShareIcon /></ControlIcon>
              </Controls>

              <CreateListButton>
                <AddIcon />
                <span>
                  Create a new list
                  <small style={{ fontWeight: 400 }}>List your movie, TV & celebrity picks.</small>
                </span>
              </CreateListButton>
            </ControlsWrap>
          </HeaderTop>
        </Container>
      </Header>

      <Divider />

      <Container>
        <ActionsBar>
          <TitleCount>0 titles</TitleCount>

          <SortControls>
            <SortButton><FilterListIcon /></SortButton>
            <span>Sort by</span>
            <SortSelect>List order ▼</SortSelect>
            <ArrowUp>↑</ArrowUp>
            <ViewIcons>
              <ViewListIcon />
              <ViewModuleIcon className="selected" />
              <DensitySmallIcon />
            </ViewIcons>
          </SortControls>
        </ActionsBar>

        <Content>
            <EmptyText>Your watchlist is empty.</EmptyText>
        </Content>
      </Container>
    </Page>
  );
};

export default Watchlist;
