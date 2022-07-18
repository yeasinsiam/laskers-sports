import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { asyncDeleteUser, handleUserDeleteCancel } from "redux/usersSlice";

const UserDeleteModal = () => {
  const dispatch = useDispatch();
  //state
  const { deleteUser } = useSelector((state) => state.users);

  //function
  const handleUserDeleteOk = () => {
    dispatch(asyncDeleteUser());
  };
  return (
    <Modal
      title="Are you sure delete this user?"
      visible={deleteUser.modalVisible}
      onOk={handleUserDeleteOk}
      confirmLoading={deleteUser.loading}
      onCancel={() => dispatch(handleUserDeleteCancel())}
    >
      <p>This will delete all data and record attached with user</p>
    </Modal>
  );
};

export default UserDeleteModal;
