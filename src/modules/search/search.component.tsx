import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import useDebounceQueryRefetch from '~/hooks/useDebounceQueryRefetch';
import { api } from '~/utils/api';
import { COLOR_PRIMARY, COLOR_SECONDARY_600 } from '~/utils/conts';
import { Cross, Search } from '~/utils/svgs';

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [blurTimeout, setBlurTimeout] = useState<number | null>(null);

  const { data, refetch } = api.profile.searchProfiles.useQuery({
    search: searchValue,
  }, {
    enabled: false,
    retry: false,
  });

  const debouceRefetch = useDebounceQueryRefetch(refetch, 650);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setSearchValue(inputValue);

    if (inputValue.length >= 2) {
      debouceRefetch();
    }
  };

  const handleButtonClick = useCallback(() => {
    // Clear the onBlur timeout if the button is clicked before the timeout triggers.
    if (blurTimeout) {
      clearTimeout(blurTimeout);
    }

    setSearchValue('');
  }, []);

  const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setBlurTimeout(
      window.setTimeout(() => {
        setIsFocused(false);
      }, 100)
    );
  };

  console.log('data: ', data);

  return (
    <div className='relative'>
      <div className={`relative z-20 flex focus:text-slate-100 border transition-all rounded-full ${isFocused ? 'border-amber-600' : 'border-transparent'}`}>
        <div className='bg-gray-800 flex justify-center items-center w-14 rounded-l-3xl'>
          {Search(24, 24, isFocused ? COLOR_PRIMARY : COLOR_SECONDARY_600)}
        </div>
        <div className=''>
          <input
            name='search'
            placeholder='Search ...'
            onFocus={() => setIsFocused(true)}
            onBlur={handleInputBlur}
            onChange={handleOnChange}
            value={searchValue}
            className="z-20 w-full bg-gray-800 h-12 outline-none p-1 pl-2 m-0 text-slate-600 focus:text-amber-600"
          />
        </div>
        <div onClick={handleButtonClick} className='bg-gray-800 flex justify-center cursor-pointer items-center w-14 rounded-r-3xl'>
          {Cross(24, 24, isFocused ? COLOR_PRIMARY : COLOR_SECONDARY_600)}
        </div>
      </div>

      {data && isFocused && <div className='absolute top-0 pt-12 w-full bg-gray-800 z-10 rounded-3xl'>
        <ul className='py-4'>
          {data.map((user, i) => {
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
          })}
        </ul>
      </div>}
    </div>
  )
}

export default SearchBar;