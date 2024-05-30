'use client';

import { PatientCard } from '@/components/PatientCard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Filter, Search, Plus } from 'lucide-react';
import React, { useState } from 'react';
import { patientsTable } from '@/models/drizzle/patientsSchema';
import { tasksTable } from '@/models/drizzle/tasksSchema';
import { useSession } from 'next-auth/react';
import { PatientCreateForm } from '@/components/patient-create-form/PatientCreateForm';

export const PatientsList = ({
  allPatients,
}: {
  allPatients: {
    patient: typeof patientsTable.$inferSelect;
    tasks: (typeof tasksTable.$inferSelect)[];
  }[];
}) => {
  const [filter, setFilter] = useState('Name');
  const [searchInput, setSearchInput] = useState('');
  const [patients, setPatients] = useState(allPatients);
  const session = useSession();
  const activeUnit = session.data?.user?.activeUnit;

  if (!activeUnit) {
    // show something more...friendly
    return <div>select a unit first.</div>;
  }

  return (
    <div className='space-y-6 rounded-lg bg-sky-50 p-6'>
      <p className='text-xl font-bold tracking-wide text-sky-700'>
        {activeUnit}
      </p>

      <div className='flex items-center gap-8 text-sky-700'>
        <DropdownMenu>
          <DropdownMenuTrigger
            id='filter-dropdown'
            className='flex cursor-pointer items-center gap-1'
          >
            <Filter></Filter>
            <Label htmlFor='filter-dropdown' className='cursor-pointer'>
              Filter
            </Label>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setFilter('ID')}>
              ID
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter('Name')}>
              Name
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter('Room')}>
              Room
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog>
          <DialogTrigger
            id='search-dialog'
            className='flex cursor-pointer items-center gap-1'
          >
            <Search></Search>
            <Label htmlFor='search-dialog' className='cursor-pointer'>
              Search
            </Label>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Search By {filter}</DialogTitle>
            </DialogHeader>
            <Input
              id='search-input'
              value={searchInput}
              onChange={(event) => {
                const value = event.target.value.trim();
                setSearchInput(value);

                setPatients(
                  patients.filter((patient) => {
                    if (value === '') return true;

                    switch (filter) {
                      case 'ID':
                        return patient.patient.id.includes(value);
                      case 'Name':
                        return (
                          patient.patient.firstName +
                          ' ' +
                          patient.patient.lastName
                        )
                          .toLowerCase()
                          .includes(value.toLowerCase());
                      case 'Room':
                        return (
                          parseInt(patient.patient.roomNumber || '0') ===
                          parseInt(value)
                        );
                      default:
                        return true;
                    }
                  })
                );
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-3'>
        {allPatients.map((patient) => (
          <div key={patient.patient.id}>
            <PatientCard patient={patient} />
          </div>
        ))}
      </div>
      {session?.data?.user?.canManagePatients && (
        <Dialog>
          <DialogTrigger id='search-dialog'>
            <div className='fixed bottom-4 right-4 z-10 rounded-full bg-sky-900 p-2 text-white shadow-lg hover:bg-sky-700'>
              <Plus strokeWidth={'2px'} size={'48px'} />
            </div>
          </DialogTrigger>
          <DialogContent className='max-w-md p-0 md:max-w-3xl'>
            <PatientCreateForm units={[]} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
