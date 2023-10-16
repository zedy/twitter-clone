import { type FC } from 'react';

interface ComponentProps {
  children: JSX.Element;
  title: string | JSX.Element;
}

const CenterComponent: FC<ComponentProps> = ({ children, title }) => {
  return (
    <main className="center-component flex justify-center">
      <div className="relative w-full min-h-screen md:max-w-2xl border border-t-0 border-b-0 rounded border-gray-600">
        <div className="p-4 w-full border-b border-gray-600">
          <strong>{title}</strong>
        </div>
        {children}
      </div>
    </main>
  )
};

export default CenterComponent;