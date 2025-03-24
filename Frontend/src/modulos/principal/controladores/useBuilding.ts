import {ref} from 'vue';

import building from '../api/building';

import type {Building, NewBuilding} from '../interface/interface-building';

export const useBuilding = () => {
    const buildings = ref<Building[]>([]);

    const getBuilding = async () => {
        const response = await building.get<Building[]>('');
        buildings.value = response.data
        console.log(response.data)
    }

    const addBuilding = async (Building: NewBuilding) => {
        try {
            console.log(Building)
            const response = await building.post<Building>('/', Building);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error(error);
            return { error: "No se pudo agregar el edificio" };
        }
    }

    return {
        buildings,
        getBuilding,
        addBuilding
    }
}

