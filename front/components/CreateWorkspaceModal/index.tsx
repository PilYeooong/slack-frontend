import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import { Button, Input, Label } from '@pages/SignUp/styles';
import axios from 'axios';
import React, { FC, useCallback } from 'react';
import { toast } from 'react-toastify';

interface IProps {
  show: boolean;
  onCloseModal: () => void;
  setShowCreateWorkspaceModal: React.Dispatch<React.SetStateAction<boolean>>;
  revalidateUser: () => Promise<boolean>;
}

const CreateWorkspaceModal: FC<IProps> = ({ show, onCloseModal, setShowCreateWorkspaceModal, revalidateUser }) => {
  const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput('');
  const [newUrl, onChangeNewUrl, setNewUrl] = useInput('');

  const onCreateWorkspace = useCallback(
    (e) => {
      e.preventDefault();
      if (!newWorkspace || !newWorkspace.trim()) return;
      if (!newUrl || !newUrl.trim()) return;
      axios
        .post(
          '/api/workspaces/',
          {
            workspace: newWorkspace,
            url: newUrl,
          },
          { withCredentials: true },
        )
        .then(() => {
          revalidateUser();
          setShowCreateWorkspaceModal(false);
          setNewWorkspace('');
          setNewUrl('');
        })
        .catch((err) => {
          console.error(err);
          toast.error(err.response.data, { position: 'bottom-center' });
        });
    },
    [newWorkspace, newUrl],
  );
  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form action="" onSubmit={onCreateWorkspace}>
        <Label id="workspace-label">
          <span>워크스페이스 이름</span>
          <Input id="workspace" value={newWorkspace} onChange={onChangeNewWorkspace} />
        </Label>
        <Label id="workspace-url-label">
          <span>워크스페이스 url</span>
          <Input id="workspace" value={newUrl} onChange={onChangeNewUrl} />
        </Label>
        <Button type="submit">생성하기</Button>
      </form>
    </Modal>
  );
};

export default CreateWorkspaceModal;
