import { useContext, useEffect, useState } from 'react';
import type { FC } from 'react';
import { ModalContext } from '~/modules/context/modalContext';

import { Cross } from '~/utils/svgs';

interface ModalProps {
  children: JSX.Element,
  closeModal: () => void,
  open: boolean,
  action?: JSX.Element,
  title?: string,
}

export const Modal: FC<ModalProps> = ({
  action,
  children,
  closeModal = () => undefined,
  open = false,
  title = null,
}) => {
  const { isLoading } = useContext(ModalContext);

  if (!open) {
    return null;
  }

  return (
    <div
      className="modal fixed w-screen h-screen z-10"
      style={{ display: open ? 'block' : 'none' }}>
      <div
        onClick={closeModal}
        className="modal-bg cursor-pointer bg-slate-500 opacity-50 absolute w-full h-full"></div>
      <div className="modal-body bg-slate-900 rounded-xl w-[480px] min-h-[150px] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <div className='relative h-full'>
          {isLoading ? <div className="absolute h-full w-full bg-slate-800 opacity-75"></div> : <div/>}
          <div className="modal-header flex justify-between border-b border-slate-400 p-5">
            <div className='flex items-center'>
              <span
                onClick={closeModal}
                className="cursor-pointer">{Cross(25, 25, 'd97706')}</span>
              {title ? <h3 className="ml-5 text-lg"><b>{title}</b></h3> : null}
            </div>
            {action ? <div>
              {action}
            </div> : null}
          </div>
          <div className="min-h-[150px] p-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export const useModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (open) {
        document.body.classList.add('disable-scroll');
      } else {
        document.body.classList.remove('disable-scroll');
      }
    }

    return () => {
      typeof document !== 'undefined' &&
        document.body.classList.remove('disable-scroll');
    };
  }, [open]);

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const toggleModal = () => {
    setOpen(!open);
  };

  const modalProps = {
    open,
    closeModal,
  };

  return { closeModal, openModal, toggleModal, modalProps };
};