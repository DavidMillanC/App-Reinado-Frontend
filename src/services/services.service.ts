const API_URL = 'http://localhost:3800';

export const getData = async (entidad: string) => {
    try {
        const response = await fetch(`${API_URL}/${entidad}`);
        if (!response.ok) {
            throw new Error('Error al obtener datos!');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener datos', error);
        throw error;
    }
};

export const postData = async (entidad: string, data: any) => {
    try {
        const response = await fetch(`${API_URL}/${entidad}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Error al ingresar dato!');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error al ingresar datos', error);
        throw error;
    }
};
export const getDataById = async (entidad: string, id: any) => {
    try {
        const response = await fetch(`${API_URL}/${entidad}/${id}`);
        if (!response.ok) {
            throw new Error('Dato no encontrado!');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener data by ID:', error);
        throw error;
    }
};

export const updateData = async (entidad: string ,id:any, dataUpdate:any) => {
    try {
        const response = await fetch(`${API_URL}/${entidad}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataUpdate)
        });
        if (!response.ok) {
            throw new Error('Dato no encontrado!');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al actualizar data:', error);
        throw error;
    }
};

export const deleteData = async (entidad: string, id:any) => {
    try {
        const response = await fetch(`${API_URL}/${entidad}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Dato no encontrado!');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al eliminar data:', error);
        throw error;
    }
};
