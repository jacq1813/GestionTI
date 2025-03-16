import {ref} from 'vue';

import incidentsApi from '../api/Incidents';
import type {Incident} from '../interface/interface-incidents';

export const useIncidents = () => {
    const incidents = ref<Incident[]>([]);

    const getIncidents = async () => {
        const response = await incidentsApi.get<Incident[]>('');
        console.log(response.data);
    }

    return {
        incidents,
        getIncidents
    }
}