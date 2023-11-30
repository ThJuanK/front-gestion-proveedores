import PropTypes from "prop-types"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useForm } from "react-hook-form";
import { put, post } from "../utils/service.js";

export const ModalForm = ( {data, id, handleOpen, handleClose, open} ) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'rgba(111, 111, 111, 0.9)',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: "20px"
      };
    const { handleSubmit, register } = useForm({defaultValues: ( data ? data:{} )});
    const onSubmit = (formData) => {
        
        let aux = Object.values(formData)
        aux = aux.map( (e) => typeof e == 'string' ? e.trim() : e )
        if(aux.includes('')) return
        if (id){
            put( id, formData ).then( (resp) => {
                if (resp.status == 200) window.location.reload();
            } )
        }
        else{
            post( formData ).then( (resp) => {
                if (resp.status == 200) window.location.reload();
            } )
        }
    };
    
    return (
        <>
            { !data && (<Button onClick={handleOpen}>Agregar proveedor</Button>)}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className = "mt-4">
                            <label htmlFor="NIT" className="form-label">NIT:</label>
                            <input id='NIT' className="form-control" type = "number" {...register('NIT')} />
                        </div>
                        <div className = "mt-4">
                            <label htmlFor="nombre_completo" className="form-label">Nombre Completo:</label>
                            <input id='nombre_completo'  className="form-control" {...register('nombre_completo')} />
                        </div>
                        <div className = "mt-4">
                            <label htmlFor="direccion" className="form-label">Direccion:</label>
                            <input id='direccion' className="form-control" {...register('direccion')} />
                        </div>
                        <div className = "mt-4">
                            <label htmlFor="telefono" className="form-label">Telefono:</label>
                            <input id='telefono' type = "number" className="form-control" {...register('telefono')} />
                        </div>
                        <div className = "mt-4">
                            <label htmlFor="ciudad" className="form-label">Ciudad:</label>
                            <input id='ciudad' className="form-control" {...register('ciudad')} />
                        </div>

                        <div className = "text-center mt-5">
                            <button type="submit" className="btn btn-outline-light">{data ? 'Actualizar' : 'Crear' }</button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    )
}

ModalForm.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.any
  }),
  handleClose: PropTypes.any,
  handleOpen: PropTypes.any,
  id: PropTypes.any,
  open: PropTypes.any,
  setOpen: PropTypes.any
}
