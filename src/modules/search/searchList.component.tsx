import Link from 'next/link';
import Image from 'next/image';
import type { FC } from 'react';

interface ComponentProps {
  data: {
    name: string | null;
    id: string;
    username: string | null;
    image: string | null;
  }[] | null | undefined;
}

const SearchList: FC<ComponentProps> = ({ data }) => {
  return (
    <div className='absolute top-0 pt-12 w-full bg-gray-800 z-10 rounded-3xl'>
      <ul className='py-4'>
        {data ? data.map((user, i) => {
          return <li key={user.id} className={`w-full p-2 transition-all bg-transparent hover:bg-gray-700 ${i > 0 ? 'mt-3' : ''}`}>
            <Link className="flex w-full" href={`/@${user.username}`}>
              <Image
                className='rounded-full overflow-hidden mr-3'
                src={user.image!}
                alt={user.username!}
                width={48}
                height={48}
              />
              <div className='flex flex-col'>
                <b>{user.name}</b>
                <span className="font-thin text-sm text-slate-300">@{user.username}</span>
              </div>
            </Link>
          </li>
        }) : null}
      </ul>
    </div>
  )
}

export default SearchList;