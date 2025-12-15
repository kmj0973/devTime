import { create } from 'zustand';

type ModalType =
  | 'timerStart'
  | 'todoList'
  | 'reset'
  | 'loginRequired'
  | 'loginFailure'
  | 'loginDuplicate'
  | 'review'
  | null;

interface ModalStore {
  modal: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  modal: null,
  openModal: (modal) => set({ modal }),
  closeModal: () => set({ modal: null }),
}));

export default useModalStore;
