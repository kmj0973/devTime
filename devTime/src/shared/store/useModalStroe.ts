import { create } from 'zustand';

type ModalType =
  | 'timerStart'
  | 'todoList'
  | 'reset'
  | 'loginRequired'
  | 'loginFailure'
  | 'loginDuplicate'
  | 'review'
  | 'studyLog'
  | null;

interface ModalStore {
  modal: ModalType;
  modalProps: string | null;

  openModal: (modal: ModalType, props?: string) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  modal: null,
  modalProps: null,
  openModal: (modal, props = '') => set({ modal, modalProps: props }),
  closeModal: () => set({ modal: null, modalProps: null }),
}));

export default useModalStore;
