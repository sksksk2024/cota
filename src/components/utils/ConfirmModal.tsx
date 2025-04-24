// ConfirmModal.tsx
'use client';

import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ConfirmModal = ({
  show,
  onCancel,
  onConfirm,
  message,
}: {
  show: boolean;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      onCancel();
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          ref={modalRef}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl p-8 w-full max-w-sm mx-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            <p className="text-xl text-center text-textis font-bold mb-4">
              {message}
            </p>
            <div className="flex flex-col justify-center items-center gap-4">
              <button
                className="text-white font-semibold w-full bg-red-500 py-3 px-6 rounded-lg cursor-pointer hover:bg-red-600"
                onClick={onConfirm}
              >
                Delete
              </button>
              <button
                className="text-gray-500 w-full text-sm cursor-pointer hover:underline"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
