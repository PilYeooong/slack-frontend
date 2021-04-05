import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import { Button, Input, Label } from '@pages/SignUp/styles';
import { IChannel, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, VFC } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import useSWR from 'swr';

interface IProps {
  show: boolean;
  onCloseModal: () => void;
  setShowCreateChannelModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateChannelModal: VFC<IProps> = ({ show, onCloseModal, setShowCreateChannelModal }) => {
  const [newChannel, onChangeNewChannel, setNewChannel] = useInput('');
  const { workspace } = useParams<{ workspace: string; channel: string }>();
  const { data: userData } = useSWR<IUser | false>('/api/users', fetcher, {});
  const { revalidate: revalidateChannel } = useSWR<IChannel[]>(
    userData ? `/api/workspaces/${workspace}/channels` : null,
    fetcher,
  );
  const onCreateChannel = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post(`/api/workspaces/${workspace}/channels`, { name: newChannel }, { withCredentials: true })
        .then(() => {
          setShowCreateChannelModal(false);
          setNewChannel('');
          revalidateChannel();
        })
        .catch((err) => {
          console.dir(err);
          toast.error(err.response?.data, { position: 'bottom-center' });
        });
    },
    [newChannel],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form action="" onSubmit={onCreateChannel}>
        <Label id="channel-label">
          <span>채널 이름</span>
          <Input id="workspace" value={newChannel} onChange={onChangeNewChannel} />
        </Label>
        <Button type="submit">생성하기</Button>
      </form>
    </Modal>
  );
};

export default CreateChannelModal;
