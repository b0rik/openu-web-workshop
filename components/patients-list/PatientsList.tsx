'use client';

import Link from 'next/link';
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

export const PatientsList = ({
  data,
}: {
  data: {
    patient: typeof patientsTable.$inferSelect;
    tasks: (typeof tasksTable.$inferSelect)[];
  }[];
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [patients, setPatients] = useState(
    data
      .sort((d1, d2) =>
        d1.patient.firstName + ' ' + d1.patient.lastName >
        d2.patient.firstName + ' ' + d2.patient.lastName
          ? 1
          : -1
      )
      .map((patient) => ({ isFiltered: false, ...patient }))
  );
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
            <DropdownMenuItem
              onClick={() => {
                setPatients(
                  patients.map((data) => {
                    return { ...data, isFiltered: false };
                  })
                );
              }}
            >
              All
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setPatients(
                  patients.map((data) => {
                    if (data.tasks.some((task) => task.isUrgent)) {
                      return { ...data, isFiltered: false };
                    }
                    return { ...data, isFiltered: true };
                  })
                );
              }}
            >
              Urgent
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
              <DialogTitle>{"Search By Patient's Name Or ID"}</DialogTitle>
            </DialogHeader>
            <Input
              id='search-input'
              value={searchInput}
              onChange={(event) => {
                const value = event.target.value.toLowerCase().trim();
                setSearchInput(value);

                setPatients(
                  patients.map((data) => {
                    if (value === '') return { ...data, isFiltered: false };

                    if (data.patient.id.startsWith(value)) {
                      return { ...data, isFiltered: false };
                    } else if (
                      (data.patient.firstName + ' ' + data.patient.lastName)
                        .toLowerCase()
                        .startsWith(value)
                    ) {
                      return { ...data, isFiltered: false };
                    }

                    return { ...data, isFiltered: true };
                  })
                );
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-3'>
        {patients.map((patientData) => {
          if (!patientData.isFiltered) {
            return (
              <div key={patientData.patient.id}>
                <PatientCard data={patientData} />
              </div>
            );
          }
        })}
      </div>
      {session?.data?.user?.canManagePatients && (
        // <Dialog>
        //   <DialogTrigger id='search-dialog'>
        //     <div className='fixed bottom-4 right-4 z-10 rounded-full bg-sky-900 p-2 text-white shadow-lg hover:bg-sky-700'>
        //       <Plus strokeWidth={'2px'} size={'48px'} />
        //     </div>
        //   </DialogTrigger>
        //   <DialogContent className='max-w-md p-0 md:max-w-3xl'>
        //     <PatientCreateForm units={[]} />
        //   </DialogContent>
        // </Dialog>
        <Link
          href='/patients/create'
          className='fixed bottom-4 right-4 z-10 rounded-full bg-sky-900 p-2 text-white shadow-lg hover:bg-sky-700'
        >
          <Plus strokeWidth={'2px'} size={'48px'} />
        </Link>
      )}
    </div>
  );
};
