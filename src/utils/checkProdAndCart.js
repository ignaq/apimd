export function check(data) {
    const errors = [];

    if (!data.cart) {
        errors.push({ message: 'id de carrito inválido' });
    }

    if (!data.product) {
        errors.push({ message: 'id de producto inválido' });
    }

    return errors;
}

