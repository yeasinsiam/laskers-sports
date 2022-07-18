import Profile from "components/profile/Profile";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { syncUser } from "redux/usersSlice";

const SinglePlayer = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    query: { playerSlug },
  } = router;

  useEffect(() => {
    if (playerSlug) {
      dispatch(syncUser(playerSlug));
    }
  }, [playerSlug]); // eslint-disable-line

  return <Profile />;
};

export default SinglePlayer;
