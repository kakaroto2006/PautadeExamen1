const express = require('express');
const app = express();

app.use(express.json());

/* =========================
   GET → Obtener catálogo
========================= */
app.get('/libros', (req, res) => {
    if (libros.length === 0) {
        return res.status(200).json({ mensaje: "No hay libros registrados", datos: [] });
    }

    res.status(200).json({
        total: libros.length,
        datos: libros
    });
});

/* =========================
   POST → Registrar libro
========================= */
app.post('/libros', (req, res) => {
    const { id, titulo, autor, anioPublicacion, estado } = req.body;

    // Validar propiedades obligatorias
    if (
        id === undefined ||
        !titulo ||
        !autor ||
        anioPublicacion === undefined ||
        !estado
    ) {
        return res.status(400).json({
            error: "Todos los campos son obligatorios"
        });
    }

    // Validar si ya existe el ID
    const existe = libros.some(libro => libro.id === id);
    if (existe) {
        return res.status(400).json({
            error: "El ID ya está registrado"
        });
    }

    // Crear objeto libro
    const nuevoLibro = {
        id: parseInt(id),
        titulo,
        autor,
        anioPublicacion: parseInt(anioPublicacion),
        estado
    };

    libros.push(nuevoLibro);

    res.status(201).json({
        mensaje: "Libro agregado correctamente",
        libro: nuevoLibro
    });
});

/* =========================
   PUT → Actualizar libro
========================= */
app.put('/libros/:id', (req, res) => {
    const idParam = parseInt(req.params.id);

    const libro = libros.find(l => l.id === idParam);

    if (!libro) {
        return res.status(404).json({
            error: "Libro no encontrado"
        });
    }

    // Solo actualizar lo que venga en el body
    const { titulo, autor, anioPublicacion, estado } = req.body;

    if (titulo !== undefined) libro.titulo = titulo;
    if (autor !== undefined) libro.autor = autor;
    if (anioPublicacion !== undefined) libro.anioPublicacion = parseInt(anioPublicacion);
    if (estado !== undefined) libro.estado = estado;

    res.status(200).json({
        mensaje: "Libro actualizado",
        libroActualizado: libro
    });
});