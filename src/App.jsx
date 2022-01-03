import React from "react";
import shortid from "shortid"

function App() {

    const [tarea, setTarea] = React.useState('');
    const [arrayTarea, setArrayTarea] = React.useState([]);
    const [modoEdicion, setmodoEdicion] = React.useState(false);
    const [id, setId] = React.useState('');
    const [error, setError] = React.useState(null)

    const agregarTarea = (e) => {
        e.preventDefault();

        if (!tarea.trim()) {
            console.log('Empty element');
            return
        }

        console.log(tarea);

        setArrayTarea([...arrayTarea, {id: shortid.generate(), nombreTarea: tarea}])

        setTarea('');
        setError(null);
    }

    const deleteTarea = (id) => {
        const arrayFiltrado = arrayTarea.filter(item => item.id !== id);
        setArrayTarea(arrayFiltrado);
    }

    const edit = (item) => {
        setmodoEdicion(modoEdicion === true ? false : true);
        setTarea(item.nombreTarea);
        setId(item.id);
    }

    const editarTarea = (e) => {
        e.preventDefault();
        if (!tarea.trim()) {
            setError('Escriba algo por favor...');
            console.log('Empty element');
            return
        }

        const nuevoArray = arrayTarea.map(
            item => item.id === id ? {id:id, nombreTarea:tarea}
                : item)

        setArrayTarea(nuevoArray);
        setmodoEdicion(false)
        setTarea('');
        setId('');
        setError(null);
    }


    return (
        <div className="container mt-5">
            <h1 className='text-center'>CRUD Simple</h1>
            <hr/>
            <div className="row">
                <div className="col-8">
                    <h4 className="text-center">Lista de tareas</h4>
                    <ul className="list-group">
                        {
                            arrayTarea.length === 0 ? 'No hay tareas' : (
                            arrayTarea.map(item => (
                                <li className="list-group-item" key={item.id}>
                                    <span className="lead">{item.nombreTarea}</span>

                                    <button
                                        className="btn btn-danger btn-sm mx-2 float-right"
                                        onClick={() => deleteTarea(item.id)}
                                    >
                                        Eliminar
                                    </button>

                                    <button
                                        className="btn btn-warning btn-sm float-right"
                                        onClick={() => edit(item)}
                                    >
                                        Editar
                                    </button>
                                </li>
                            )))
                        }
                    </ul>
                </div>
                <div className="col-4">
                    <h4 className="text-center">
                        {modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'}
                    </h4>
                    <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
                        {
                            error ? <span className="text-danger">{error}</span> : null
                        }
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Ingresa la tarea"
                            onChange={e => setTarea(e.target.value)}
                            value={tarea}
                        />
                        {
                            modoEdicion ? (<button className="btn btn-warning btn-block" type='submit'>Editar</button>)
                                : (<button className="btn btn-dark btn-block" type='submit'>Agregar</button>)
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
