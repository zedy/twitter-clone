import { useCallback, useState } from 'react';
import useDebounceQueryRefetch from '~/hooks/useDebounceQueryRefetch';
import { api } from '~/utils/api';
import { COLOR_PRIMARY, COLOR_SECONDARY_600 } from '~/utils/conts';
import { Cross, Search } from '~/utils/svgs';
import SearchList from './searchList.component';

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

  const debouceRefetch = useDebounceQueryRefetch(refetch, 550);

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

  /**
   * the reason we don't move the seach-bar part of the jsx and it's proprietery
   * logic into a separate components is it would need 5 different props passed 
   * down and that's way to much. 
   * 
   * If/when we come to the crossroad where we need a similar fn we'll refactor
   * for now it'll stay like this.
   */
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

      {data && isFocused && <SearchList data={data} />}
    </div>
  )
}

export default SearchBar;