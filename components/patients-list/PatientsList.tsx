'use client'

import { PatientCard } from '@/components/PatientCard';
import { ScrollArea } from "@/components/ui/scrollarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import { Filter, Search, Plus} from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { patientsTable } from '@/models/drizzle/patientsSchema';

export const PatientsList = ({allPatients}: {allPatients: typeof patientsTable.$inferSelect[]}) => {
  const [filter, setFilter] = useState('Name');
  const [searchInput, setSearchInput] = useState('');
  const [patients, setPatients] = useState(allPatients);

  return (
    <div>
        <Button asChild className='mb-5'>
          <Link href="/auth/login">logout</Link>
        </Button>

      <div className="bg-cyan-50 p-10 rounded-xl">
        <div className="grid-rows-4 grid-flow-col gap-4">
          

          <div className="flex justify-between text-sky-700">
            <p className="font-bold text-xl tracking-wide flex items-center">Internal Medicine A</p>
            <Button asChild>
              <Link href="/create-patient">New<Plus></Plus></Link>
            </Button>
          </div>
        </div>
      

        <div className="flex text-sky-700 items-center mt-10 mb-5">
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger id="filter-dropdown"><Filter></Filter></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilter('ID')}>ID</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('Name')}>Name</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('Room')}>Room</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Label htmlFor="filter-dropdown">Filter</Label>
          </div>
          <div className="flex items-center ml-8">
            <Dialog>
              <DialogTrigger id="search-dialog"><Search></Search></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Filter By {filter}</DialogTitle>
                  <DialogDescription>
                  <Input
                    id="search-input"
                    className="col-span-3"
                    value={searchInput}
                    onChange={(event) => {
                      const value = event.target.value.trim();
                      setSearchInput(value);

                      setPatients(
                        patients.filter((patient) => {
                          if (value === '') return true;

                          switch (filter) {
                            case 'ID':
                              return patient.id.includes(value);
                            case 'Name':
                              return (patient.firstName + " " + patient.lastName).toLowerCase().includes(value.toLowerCase());
                            case 'Room':
                              return parseInt(patient.roomNumber || '0') === parseInt(value);
                            default:
                              return true;
                          }
                        })
                      );
                    }}
                  />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Label htmlFor="search-dialog">Search</Label>
          </div>
        </div>
        


        <ScrollArea className="h-screen rounded-md">
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {allPatients.map((patient) => (
              <div key={patient.id}>
                  <PatientCard patient={patient} />
              </div>
              ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
};

