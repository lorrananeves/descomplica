import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  MenuItem,
  Select,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';

const EditarTarefa = ({
  handleCloseEditar,
  idTarefaSelecionada,
  tarefas,
  tarefa,
  setTarefas,
}) => {
  const [formValues, setFormValues] = useState({
    idTarefa: idTarefaSelecionada,
    tituloTarefa: '',
    descricaoTarefa: '',
    inicioTarefa: '',
    fimTarefa: '',
    recursoTarefa: '',
    statusTarefa: '',
  });

  useEffect(() => {
    setFormValues({
      ...formValues,
      tituloTarefa: tarefa.tituloTarefa,
      descricaoTarefa: tarefa.descricaoTarefa,
      inicioTarefa: tarefa.inicioTarefa,
      fimTarefa: tarefa.fimTarefa,
      recursoTarefa: tarefa.recursoTarefa,
      statusTarefa: tarefa.statusTarefa,
    });
  }, [tarefa]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleEditar = () => {
    setTarefas((current) =>
      current.map((obj) =>
        obj.idTarefa === idTarefaSelecionada
          ? {
              ...obj,
              ...formValues,
            }
          : obj
      )
    );
    handleCloseEditar();
  };

  return (
    <Grid container spacing={2}>
      <Card sx={style}>
        <CardHeader title="Tarefas" subheader="Edição de Tarefas" />
        <CardContent sx={{
          width: '95%',
          maxWidth: '100%',
        }}>
          {renderInput('tituloTarefa', 'Título da Tarefa', 'text')}
          {renderInput('descricaoTarefa', 'Descrição da Tarefa', 'text')}
          <Grid container spacing={2} mt={1}>
            {renderInput('inicioTarefa', 'Início da Tarefa', 'date', '13px')}
            {renderInput('fimTarefa', 'Fim da Tarefa', 'date', '13px')}
            {renderSelect(
              'recursoTarefa',
              'Recurso',
              ['Recurso 1', 'Recurso 2', 'Recurso 3']
            )}
            {renderSelect(
              'statusTarefa',
              'Status',
              ['Aguardando', 'Em Andamento', 'Concluída']
            )}
            <Grid container spacing={2} pl={2} mt={2}>
              <Grid item xs={1}>
                <Button size="small" variant="contained" onClick={handleEditar}>
                  Salvar
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button size="small" variant="outlined" onClick={handleCloseEditar}>
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );

  function renderInput(name, label, type, paddingLeft) {
    return (
      <Grid item xs={12}>
        <FormControl fullWidth>
          <Input
            id={`tarefa_${name}`}
            type={type}
            name={name}
            value={formValues[name]}
            onChange={handleInputChange}
            sx={{
              color: 'rgba(0, 0, 0, 0.6)',
              fontWeight: 400,
              paddingLeft: paddingLeft,
            }}
          />
          <FormHelperText id={`tarefa_${name}_helper_text`}>{label}</FormHelperText>
        </FormControl>
      </Grid>
    );
  }

  function renderSelect(name, label, options) {
    return (
      <Grid item xs={3}>
        <FormControl fullWidth>
          <InputLabel htmlFor={`tarefa_${name}`}>{label}</InputLabel>
          <Select
            id={`tarefa_${name}`}
            name={name}
            value={formValues[name]}
            onChange={handleInputChange}
            size="small"
            sx={{
              color: 'rgba(0, 0, 0, 0.6)',
              fontWeight: 400,
            }}
          >
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    );
  }
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  p: 4,
};

export default EditarTarefa;
