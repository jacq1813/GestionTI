import {ref} from 'vue';

import classroom from '../api/classroom';
import type {Classroom} from '../interface/interface-classroom';

export const useClassroom = () => {
    const classrooms = ref<Classroom[]>([]);

    const getClassroom = async () => {
        const response = await classroom.get<Classroom[]>('');
        classrooms.value = response.data
        console.log(response.data)
    }

    return {
        classrooms,
        getClassroom
    }
}