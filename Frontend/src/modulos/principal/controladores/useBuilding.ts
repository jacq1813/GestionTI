import {ref} from 'vue';

import building from '../api/building';

import type {Building} from '../interface/interface-building';

export const useBuilding = () => {
    const buildings = ref<Building[]>([]);

    const getBuilding = async () => {
        const response = await building.get<Building[]>('');
        buildings.value = response.data
        console.log(response.data)
    }

    return {
        buildings,
        getBuilding
    }
}

