'use client';
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { EditIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { Input } from './ui/input';
import { Modal, ModalBody, ModalFooter, ModalHeader } from './ui/modal-new';

interface Plant {
  id: number;
  type: string;
  variety: string;
  quantity: number;
  datePlanted: Date;
  harvestDate: Date;
  status: string;
  notes: string;
}

function PlantTable() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'update'>('add');
  const [currentPlant, setCurrentPlant] = useState<Partial<Plant>>({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [plantToDelete, setPlantToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchPlants = async () => {
      const response = await fetch('/api/plants');
      const data: Plant[] = await response.json();
      if (Array.isArray(data)) {
        setPlants(data);
        setFilteredPlants(data);
      } else {
        console.error('Fetched data is not an array:', data);
      }
    };

    fetchPlants();
  }, []);

  useEffect(() => {
    setFilteredPlants(plants.filter(plant => plant.type && plant.type.includes(searchTerm)));
  }, [searchTerm, plants]);

  const handleFormOpen = (mode: 'add' | 'update', plant?: Plant) => {
    setFormMode(mode);
    if (plant) {
      setCurrentPlant(plant);
    } else {
      setCurrentPlant({});
    }
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentPlant((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!currentPlant.type || !currentPlant.notes || !currentPlant.datePlanted || !currentPlant.harvestDate || !currentPlant.quantity || !currentPlant.variety|| !currentPlant.status) {
      alert('Please fill in all required fields.');
      return;
    }

    const requestBody = {
      type: currentPlant.type,
      variety: currentPlant.variety,
      quantity:  Number(currentPlant.quantity),
      datePlanted: currentPlant.datePlanted,
      harvestDate: currentPlant.harvestDate,
      status: currentPlant.status,
      notes: currentPlant.notes,
    };
  
    try {
      let response;
      if (formMode === 'add') {
        response = await fetch('/api/plants', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
      } else if (formMode === 'update') {
        response = await fetch(`/api/plants/${currentPlant.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
      }
  
      if (response && !response.ok) {
        const errorData = await response.json();
        console.error('Error response from server:', errorData);
        return;
      }
  
      if (response) {
        const data = await response.json();
  
        if (formMode === 'add') {
          setPlants([...plants, data]);
        } else if (formMode === 'update') {
          setPlants(plants.map((plant) => (plant.id === data.id ? data : plant)));
        }
  
        handleFormClose();
      } else {
        console.error('Fetch response is undefined');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDelete = (id: number) => {
    setPlantToDelete(id);
    setShowConfirmDialog(true);
  };

  const confirmDelete = async () => {
    if (plantToDelete !== null) {
      await fetch(`/api/plants/${plantToDelete}`, {
        method: 'DELETE',
      });

      setPlants(plants.filter((plant) => plant.id !== plantToDelete));
      setPlantToDelete(null);
    }
    setShowConfirmDialog(false);
  };

  const cancelDelete = () => {
    setPlantToDelete(null);
    setShowConfirmDialog(false);
  };

  return (
    <div className="p-2 w-[400px] md:w-auto">
      <div className="sticky top-0 bg-white pb-2">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2 md:gap-4">
          <div className="flex items-center gap-2 md:gap-4 w-[400px] md:w-auto">
            <Button onClick={() => handleFormOpen('add')} className="text-xs md:text-base ">
              <PlusIcon className="mr-1 md:mr-2 h-4 w-4 md:h-5 md:w-5" />
              <span className="md:inline">Add Entry</span>
            </Button>
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-xs md:text-base hidden md:block"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-[400px] md:w-auto">
            <div className="bg-white p-1 md:p-2 rounded shadow-md text-center flex-grow md:flex-grow-0">
              <p className="text-xxs md:text-xs">Total Plants</p>
              <p className="text-sm md:text-lg font-bold">{plants.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute overflow-x-auto overflow-y-scroll max-w-[calc(100vh-200px)] md:max-w-[calc(800vh-200px)] max-h-[calc(100vh-200px)]">
        <div className="w-[400px] md:w-full">
          <Table className="min-w-[400px] md:min-w-[1060px]">
            <TableCaption>A list of your plants.</TableCaption>
            <TableHeader>
              <TableRow className="bg-slate-200">
                <TableHead className="text-xs md:text-sm text-gray-700">Type</TableHead>
                <TableHead className="text-xs md:text-sm text-gray-700">Variety</TableHead>
                <TableHead className="text-xs md:text-sm text-gray-700">Quantity</TableHead>
                <TableHead className="text-xs md:text-sm text-gray-700">Date Planted</TableHead>
                <TableHead className="text-xs md:text-sm text-gray-700">Harvest Date</TableHead>
                <TableHead className="text-xs md:text-sm text-gray-700">Status</TableHead>
                <TableHead className="text-xs md:text-sm text-gray-700">Notes</TableHead>
                <TableHead className="text-xs md:text-sm text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(filteredPlants) && filteredPlants.map((plant) => (
                <TableRow key={plant.id}>
                  <TableCell className="text-xs md:text-sm">{plant.type}</TableCell>
                  <TableCell className="text-xs md:text-sm">{plant.variety}</TableCell>
                  <TableCell className="text-xs md:text-sm">{plant.quantity}</TableCell>
                  <TableCell className="text-xs md:text-sm">{new Date(plant.datePlanted).toLocaleDateString()}</TableCell>
                  <TableCell className="text-xs md:text-sm">{new Date(plant.harvestDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-xs md:text-sm">{plant.status}</TableCell>
                  <TableCell className="text-xs md:text-sm">{plant.notes}</TableCell>
                  <TableCell className="flex items-center gap-2 text-xs md:text-sm">
                    <Button variant="secondary" onClick={() => handleFormOpen('update', plant)}>
                      <EditIcon className="h-5 w-5 text-blue-500" />
                    </Button>
                    <Button variant="secondary" onClick={() => handleDelete(plant.id)}>
                      <Trash2Icon className="h-5 w-5 text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              {/* Add footer content here if needed */}
            </TableFooter>
          </Table>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <Modal isOpen={showForm} onClose={handleFormClose}>
          <ModalHeader>
            {formMode === 'add' ? 'Add New Plant' : 'Update Plant'}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                type="text"
                name="type"
                value={currentPlant.type || ''}
                onChange={handleInputChange}
                placeholder="Type"
              />
              <Input
                type="text"
                name="variety"
                value={currentPlant.variety || ''}
                onChange={handleInputChange}
                placeholder="Variety"
              />
              <Input
                type="number"
                name="quantity"
                value={currentPlant.quantity || ''}
                onChange={handleInputChange}
                placeholder="Quantity"
              />
              <Input
                type="date"
                name="datePlanted"
                value={currentPlant.datePlanted ? new Date(currentPlant.datePlanted).toISOString().substr(0, 10) : ''}
                onChange={handleInputChange}
                placeholder="Date Planted"
              />
              <Input
                type="date"
                name="harvestDate"
                value={currentPlant.harvestDate ? new Date(currentPlant.harvestDate).toISOString().substr(0, 10) : ''}
                onChange={handleInputChange}
                placeholder="Harvest Date"
              />
              <Input
                type="text"
                name="status"
                value={currentPlant.status || ''}
                onChange={handleInputChange}
                placeholder="Status"
              />
              <Input
                type="text"
                name="notes"
                value={currentPlant.notes || ''}
                onChange={handleInputChange}
                placeholder="Notes"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit}>{formMode === 'add' ? 'Add Plant' : 'Update Plant'}</Button>
            <Button onClick={handleFormClose} variant="secondary">Cancel</Button>
          </ModalFooter>
        </Modal>
      )}

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog ">
          <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
            <div className=" opacity-25 w-full h-full absolute z-10 inset-0"></div>
            <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
              <div className="md:flex items-center">
                <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                  <i className="bx bx-error text-3xl">&#9888;</i>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                  <p className="font-bold">Warning!</p>
                  <p className="text-sm text-gray-700 mt-1">
                    You will lose all of your data by deleting this. This action cannot be undone.
                  </p>
                </div>
              </div>
              <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                <button
                  id="confirm-delete-btn"
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
                <button
                  id="confirm-cancel-btn"
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlantTable;
