export function check(data) {
    const errors = [];

    if (!data.title || data.title.trim() === '') {
        errors.push({ field: 'title', message: 'El título es obligatorio' });
    }

    if (!data.description || data.description.trim() === '') {
        errors.push({ field: 'description', message: 'La descripción es obligatoria' });
    }

    if (!data.code || data.code.trim() === '') {
        errors.push({ field: 'code', message: 'El código es obligatorio' });
    }

    if (!data.price || isNaN(data.price)) {
        errors.push({ field: 'price', message: 'El precio debe ser un número' });
    }

    if (!data.stock || isNaN(data.stock) || data.stock <= 0) {
        errors.push({ field: 'stock', message: 'El stock debe ser un número entero mayor que 0' });
    }

    if (!data.category || data.category.trim() === '') {
        errors.push({ field: 'category', message: 'La categoría es obligatoria' });
    }

    return errors;
}

