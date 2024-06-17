'use client';

import {
  ChangeEvent,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid';

type FilterOption = {
  value: string;
  label: string;
  checked: boolean;
};

type FiltersType = {
  category: FilterOption[];
  subCategory: {
    category: string;
    subCategory: FilterOption[];
  }[];
  urgency: FilterOption[];
  status: FilterOption[];
};

const sortOptions = [
  { name: 'Closest Due Date First', href: '#', current: false },
  { name: 'Farthest Due Date First', href: '#', current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

type FilterPropsType = {
  filterList: FiltersType;
  setFilterList: Dispatch<SetStateAction<FiltersType>>;
};

export default function Filter({ filterList, setFilterList }: FilterPropsType) {
  // const [filterList, setFilterList] = useState(filters);
  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);

  useEffect(() => {
    setCheckedCategories(
      filterList.category
        .filter((category) => category.checked)
        .map(({ value }) => value)
    );
  }, [filterList]);

  const onCategoryChanged = (
    event: ChangeEvent<HTMLInputElement>,
    option: FilterOption
  ) => {
    const entry = filterList.category.find((cat) => cat.value === option.value);

    if (entry) {
      entry.checked = event.target.checked;
      setFilterList((current) => {
        const allCatsExceptEntry = current.category.filter(
          (cat) => cat.value !== entry.value
        );

        const newSubCategories = current.subCategory.map((subCat) => {
          if (subCat.category === entry.value) {
            return {
              category: subCat.category,
              subCategory: subCat.subCategory.map((innerSubCat) => ({
                ...innerSubCat,
                checked: false,
              })),
            };
          }

          return subCat;
        });

        const newFilters = {
          ...current,
          category: [...allCatsExceptEntry, entry].sort((a, b) =>
            a.value.localeCompare(b.value)
          ),
          subCategory: newSubCategories,
        };
        return newFilters;
      });
    }
  };

  const onSubCategoryChanged = (
    event: ChangeEvent<HTMLInputElement>,
    option: FilterOption,
    parentCategory: string
  ) => {
    setFilterList((current) => {
      const categoryEntry = current.subCategory.find(
        (subCat) => subCat.category === parentCategory
      );

      if (categoryEntry) {
        const subCategoryEntry = categoryEntry.subCategory.find(
          (sub) => sub.value === option.value
        );

        if (subCategoryEntry) {
          subCategoryEntry.checked = event.target.checked;

          const allSubCatsExceptEntry = categoryEntry.subCategory.filter(
            (sub) => sub.value !== subCategoryEntry.value
          );

          const updatedCategoryEntry = {
            ...categoryEntry,
            subCategory: [...allSubCatsExceptEntry, subCategoryEntry].sort(
              (a, b) => a.value.localeCompare(b.value)
            ),
          };

          const newSubCategories = current.subCategory.map((subCat) =>
            subCat.category === parentCategory ? updatedCategoryEntry : subCat
          );

          return {
            ...current,
            subCategory: newSubCategories,
          };
        }
      }

      return current;
    });
  };

  const onUrgencyChanged = (
    event: ChangeEvent<HTMLInputElement>,
    option: FilterOption
  ) => {
    const entry = filterList.urgency.find((urg) => urg.value === option.value);

    if (entry) {
      entry.checked = event.target.checked;

      setFilterList((current) => {
        const allUrgExceptEntry = current.urgency.filter(
          (urg) => urg.value !== entry.value
        );
        const newFilters = {
          ...current,
          urgency: [...allUrgExceptEntry, entry].sort((a, b) =>
            a.value.localeCompare(b.value)
          ),
        };
        return newFilters;
      });
    }
  };

  const onStatusChanged = (
    event: ChangeEvent<HTMLInputElement>,
    option: FilterOption
  ) => {
    const entry = filterList.status.find((sts) => sts.value === option.value);

    if (entry) {
      entry.checked = event.target.checked;

      setFilterList((current) => {
        const allStsExceptEntry = current.status.filter(
          (sts) => sts.value !== entry.value
        );
        const newFilters = {
          ...current,
          status: [...allStsExceptEntry, entry].sort((a, b) =>
            a.value.localeCompare(b.value)
          ),
        };
        return newFilters;
      });
    }
  };

  return (
    <div className='bg-white'>
      {/* Filters */}
      <Disclosure
        as='section'
        aria-labelledby='filter-heading'
        className='mb-12 grid items-center border-b border-gray-200'
      >
        <h2 id='filter-heading' className='sr-only'>
          Filters
        </h2>
        <div className='relative col-start-1 row-start-1 py-4'>
          <div className='mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8'>
            <div>
              <DisclosureButton className='group flex items-center font-medium text-gray-700'>
                <FunnelIcon
                  className='mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500'
                  aria-hidden='true'
                />
                Filter
              </DisclosureButton>
            </div>
            <div className='pl-6'>
              <button type='button' className='text-gray-500'>
                Clear all
              </button>
            </div>
          </div>
        </div>
        <DisclosurePanel className='border-t border-gray-200 py-10'>
          <div className='mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8'>
            <div className='grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6'>
              <fieldset>
                <legend className='block font-medium'>Category</legend>
                <div className='space-y-6 pt-6 sm:space-y-4 sm:pt-4'>
                  {filterList.category.map((option, optionIdx) => (
                    <div
                      key={option.value}
                      className='flex items-center text-base sm:text-sm'
                    >
                      <input
                        onChange={(event) => onCategoryChanged(event, option)}
                        id={`category-${optionIdx}`}
                        name='category[]'
                        defaultValue={option.value}
                        type='checkbox'
                        className='h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                        defaultChecked={option.checked}
                      />
                      <label
                        htmlFor={`category-${optionIdx}`}
                        className='ml-3 min-w-0 flex-1 text-gray-600'
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className='block font-medium'>Sub Category</legend>
                <div className='space-y-6 pt-6 sm:space-y-4 sm:pt-4'>
                  {filterList.subCategory
                    .filter((subCategory) =>
                      checkedCategories.includes(subCategory.category)
                    )
                    .map((subCategory) =>
                      subCategory.subCategory.map((option, optionIdx) => (
                        <div
                          key={option.value}
                          className='flex items-center text-base sm:text-sm'
                        >
                          <input
                            onChange={(event) =>
                              onSubCategoryChanged(
                                event,
                                option,
                                subCategory.category
                              )
                            }
                            id={`subCategory-${optionIdx}`}
                            name='subCategory[]'
                            defaultValue={option.value}
                            type='checkbox'
                            className='h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                            defaultChecked={option.checked}
                          />
                          <label
                            htmlFor={`subCategory-${optionIdx}`}
                            className='ml-3 min-w-0 flex-1 text-gray-600'
                          >
                            {option.label}
                          </label>
                        </div>
                      ))
                    )}
                  {/* {filters.subCategory.map((option, optionIdx) => (
                    <div
                      key={option.value}
                      className='flex items-center text-base sm:text-sm'
                    >
                      <input
                        id={`subCategory-${optionIdx}`}
                        name='subCategory[]'
                        defaultValue={option.value}
                        type='checkbox'
                        className='h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                        defaultChecked={option.checked}
                      />
                      <label
                        htmlFor={`subCategory-${optionIdx}`}
                        className='ml-3 min-w-0 flex-1 text-gray-600'
                      >
                        {option.label}
                      </label>
                    </div>
                  ))} */}
                </div>
              </fieldset>
            </div>
            <div className='grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6'>
              <fieldset>
                <legend className='block font-medium'>Urgency</legend>
                <div className='space-y-6 pt-6 sm:space-y-4 sm:pt-4'>
                  {filterList.urgency.map((option, optionIdx) => (
                    <div
                      key={option.value}
                      className='flex items-center text-base sm:text-sm'
                    >
                      <input
                        onChange={(event) => onUrgencyChanged(event, option)}
                        id={`urgency-${optionIdx}`}
                        name='urgency[]'
                        defaultValue={option.value}
                        type='checkbox'
                        className='h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                        defaultChecked={option.checked}
                      />
                      <label
                        htmlFor={`urgency-${optionIdx}`}
                        className='ml-3 min-w-0 flex-1 text-gray-600'
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className='block font-medium'>Status</legend>
                <div className='space-y-6 pt-6 sm:space-y-4 sm:pt-4'>
                  {filterList.status.map((option, optionIdx) => (
                    <div
                      key={option.value}
                      className='flex items-center text-base sm:text-sm'
                    >
                      <input
                        onChange={(event) => onStatusChanged(event, option)}
                        id={`status-${optionIdx}`}
                        name='status[]'
                        defaultValue={option.value}
                        type='checkbox'
                        className='h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                        defaultChecked={option.checked}
                      />
                      <label
                        htmlFor={`status-${optionIdx}`}
                        className='ml-3 min-w-0 flex-1 text-gray-600'
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>
        </DisclosurePanel>
        <div className='col-start-1 row-start-1 py-4'>
          <div className='mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8'>
            <Menu as='div' className='relative inline-block'>
              <div className='flex'>
                <MenuButton className='group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900'>
                  Sort
                  <ChevronDownIcon
                    className='-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                    aria-hidden='true'
                  />
                </MenuButton>
              </div>

              <Transition
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <MenuItems className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <div className='py-1'>
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        {({ focus }) => (
                          <a
                            href={option.href}
                            className={classNames(
                              option.current
                                ? 'font-medium text-gray-900'
                                : 'text-gray-500',
                              focus ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}


