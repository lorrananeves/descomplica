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

const CriarTarefa = ({ handleClose, tarefas, setTarefas }) => {
  const [idTarefa, setIdTarefa] = useState(0); // Inicialize o estado com 0
  const [formValues, setFormValues] = useState({
    tituloTarefa: '',
    descricaoTarefa: '',
    inicioTarefa: '',
    fimTarefa: '',
    recursoTarefa: '',
    statusTarefa: '',
  });

  useEffect(() => {
    const proximoId = Math.max(...tarefas.map((tarefa) => tarefa.idTarefa)) + 1;
    setIdTarefa(proximoId);
  }, [tarefas]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSalvar = () => {
    console.log('Dados do formulário:', formValues);

    setTarefas([
      ...tarefas,
      {
        idTarefa,
        ...formValues,
      },
    ]);

    handleClose();
  };

  return (
    <Grid container spacing={2}>
      <Card sx={style}>
        <CardHeader title="Tarefas" subheader="Cadastro de Tarefas" />
        <CardContent sx={{ width: '95%', maxWidth: '100%' }}>
          {renderInput('tituloTarefa', 'Título da Tarefa', 'text')}
          {renderInput('descricaoTarefa', 'Descrição da Tarefa', 'text')}
          <Grid container spacing={2} mt={1}>
            {renderInput('inicioTarefa', 'Início da Tarefa', 'date', '13px')}
            {renderInput('fimTarefa', 'Fim da Tarefa', 'date', '13px')}
            {renderSelect('recursoTarefa', 'Recurso', [
              'Recurso 1',
              'Recurso 2',
              'Recurso 3',
            ])}
            {renderSelect('statusTarefa', 'Status', [
              'Aguardando',
              'Em Andamento',
              'Concluída',
            ])}
            <Grid container spacing={2} pl={2} mt={2}>
              <Grid item xs={1}>
                <Button size="small" variant="contained" onClick={handleSalvar}>
                  Salvar
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button size="small" variant="outlined" onClick={handleClose}>
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

export default CriarTarefa;
