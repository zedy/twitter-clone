import React, {type FC } from 'react'

const FormError: FC<{ message: string }> = ({ message }) => (
  <span className="text-red-800">{message}</span>
);

export default FormError;