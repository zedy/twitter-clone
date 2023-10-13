import { type FC } from 'react';

interface ComponentProps {
  children: JSX.Element;
}

const CenterComponent: FC<ComponentProps> = ({ children }) => {
  return (
    <main className="center-component flex justify-center">
      <div className="relative w-full min-h-screen md:max-w-2xl border border-t-0 border-b-0 rounded border-gray-600">
        {children}
      </div>
    </main>
  )
};

export default CenterComponent;