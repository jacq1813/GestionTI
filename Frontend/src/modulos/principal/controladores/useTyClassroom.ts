import {ref} from 'vue';

import tyclassApi from '../api/tyclass'
import type {TipoAula} from '../interface/interface-tyclass'

export const useTyClassroom = () =>{

    const tyclass = ref<TipoAula[]>([]);

    const getTyClass = async () => {
        const response = await tyclassApi.get<TipoAula[]>('');
        tyclass.value = response.data;
     
    }
    return{
        getTyClass,
        tyclass
    }
}