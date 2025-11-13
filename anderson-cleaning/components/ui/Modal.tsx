
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { XIconCareers } from '../careers/icons'; // Ensure XIconCareers is defined

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footerActions?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footerActions }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose} // Close on overlay click
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative bg-card dark:bg-slate-800 rounded-lg shadow-xl max-w-lg w-full p-6"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
          >
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-semibold text-card-foreground dark:text-gray-100">{title}</h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:text-slate-400 dark:hover:text-slate-200">
                <XIconCareers className="h-5 w-5" />
              </Button>
            </div>
            <div className="text-sm text-card-foreground dark:text-gray-300 mb-6">
              {children}
            </div>
            {footerActions && (
              <div className="flex justify-end space-x-3">
                {footerActions}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
