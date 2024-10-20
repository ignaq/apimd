const socket = io();
// Escuchar cuando se envía el formulario
const form = document.getElementById('add-product-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtener los valores de los campos
    const title = document.getElementById('title').value;
    const price = parseFloat(document.getElementById('price').value);
    const description = document.getElementById('description').value;
    const status = document.getElementById('status').value === 'true';  // Convertir a booleano
    const code = document.getElementById('code').value;
    const stock = parseInt(document.getElementById('stock').value);
    const category = document.getElementById('category').value;
    const thumbnails = [
        document.getElementById('thumbnail').value,
    ];

    
    const producto = {
        nombre: title,
        descripcion: description,
        precio: price,
        categoria: category,
        stock: stock,
        code: code,
        status: status,
        thumbnails: [
        ]
    };

    console.log(producto)
    
    fetch('/api/products', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(producto) 
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la creación del producto');
            }
            return response.json(); 
        })
        .then(data => {
            console.log('Producto creado exitosamente:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    // Emitir el nuevo producto al servidor
 

    // Limpiar el formulario después de enviarlo
    form.reset();
    
   

});
