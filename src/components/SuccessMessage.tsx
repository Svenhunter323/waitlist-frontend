import React from 'react';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface SuccessMessageProps {
  message: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card max-w-md mx-auto text-center bg-success-50 border-success-200"
    >
      <CheckCircle className="w-12 h-12 text-success-600 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-success-800 mb-2">Success!</h3>
      <p className="text-success-700">{message}</p>
    </motion.div>
  );
};

export default SuccessMessage;