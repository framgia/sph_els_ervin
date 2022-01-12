import { ReactElement } from 'react';

interface Props {
  message?: string;
}

function FormError({ message }: Props): ReactElement {
  return <p className='text-red-500 float-left mt-2 text-xs'>{message}</p>;
}

export default FormError;
