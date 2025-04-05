import {ref} from 'vue';

import Classroo from '../api/classroom';
import type {Classroom,ClassroomNew} from '../interface/interface-classroom';

export const useClassroom = () => {
    const classrooms = ref<Classroom[]>([]);

    const getClassroom = async () => {
        const response = await Classroo.get<Classroom[]>('');
        classrooms.value = response.data
        console.log(response.data)
    }

    const getClassroomsDetail = async () => {
        const response = await Classroo.get<Classroom[]>('/Detail');
        classrooms.value = response.data
        console.log(response.data)
    }

    const addClassroom = async (classroom: ClassroomNew) => {
        try {
            console.log(classroom)
            const response = await Classroo.post<Classroom>('/', classroom);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error(error);
            return { error: "No se pudo agregar el edificio" };
        }
    }


    return {
        classrooms,
        getClassroom,
        getClassroomsDetail,
        addClassroom
    }
}