import {
  Avatar,
  Typography,
  ListItemText,
  ListItem,
  Container,
  IconButton,
} from "@mui/material";
import {
  useMemberListItemStyles,
  StyledBadge,
} from "../styles/useMemberListItemStyles";
import classNames from "classnames";
import MemberMenu from "./MemberMenu";

export default function MemberListItem({ member, open, handleDrawerOpen }) {
  const classes = useMemberListItemStyles(open);
  const memberListClass = classNames(classes.memberList, {
    [classes.memberListOpen]: !open,
  });
  const badgeClass = classNames(classes.userBadge, {
    [classes.userBadgeOpen]: open,
  });

  return (
    <Container className={classes.member}>
      <Typography className={classes.role} variant="button">
        {member.role}
      </Typography>
      <IconButton className={classes.memberIcon}>
        <ListItem
          disableGutters
          className={memberListClass}
          open={open}
          onClick={handleDrawerOpen}
        >
          <StyledBadge
            className={badgeClass}
            overlap="circular"
            open={open}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant={member.is_active ? "dot" : "standard"}
          >
            <Avatar alt={member.nickname} src={member.avatar} />
          </StyledBadge>
          <ListItemText primary={member.nickname} open={open} />
          {open && <MemberMenu member={member} />}
        </ListItem>
      </IconButton>
    </Container>
  );
}
