import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { userService, alertService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('Nome é obrigatorio'),
        lastName: Yup.string()
            .required('Sobrenome é obirgatorio'),
        email: Yup.string()
            .email('Email invalido')
            .required('O email é obrigatorio'),
        gender: Yup.string()
            .required('o genero é obrigatorio'),
        password: Yup.string()
            .transform(x => x === '' ? undefined : x)
            .concat(isAddMode ? Yup.string().required('A senha é obrigatoria') : null)
            .min(6, 'A senha tem que ter no minimo 6 caracteres'),
        confirmPassword: Yup.string()
            .transform(x => x === '' ? undefined : x)
            .when('password', (password, schema) => {
                if (password || isAddMode) return schema.required('É obrigatorio confirmar senha');
            })
            .oneOf([Yup.ref('password')], 'As senhas não coicidem')
    });

    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createUser(data)
            : updateUser(id, data);
    }

    function createUser(data) {
        return userService.create(data)
            .then(() => {
                alertService.success('Usuario adicionado com sucesso', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateUser(id, data) {
        return userService.update(id, data)
            .then(() => {
                alertService.success('Usuario editado com sucesso', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    const [user, setUser] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (!isAddMode) {
            userService.getById(id).then(user => {
                const fields = ['firstName', 'lastName', 'email', 'gender'];
                fields.forEach(field => setValue(field, user[field]));
                setUser(user);
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Adicionar Contato ' : 'Editar Contato'}</h1>
            <div className="form-row">
                
                <div className="form-group col-5">
                    <label>Nome</label>
                    <input name="firstName" type="text" ref={register} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.firstName?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Sobrenome</label>
                    <input name="lastName" type="text" ref={register} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-7">
                    <label>Email</label>
                    <input name="email" type="text" ref={register} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="form-group col">
                    <label>Genero</label>
                    <select name="gender" ref={register} className={`form-control ${errors.gender ? 'is-invalid' : ''}`}>
                        <option value=""></option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Feminino</option>
                    </select>
                    <div className="invalid-feedback">{errors.gender?.message}</div>
                </div>
            </div>
            {!isAddMode &&
                <div>
                    <h3 className="pt-3">Trocar Senha</h3>
                    <p>Deixe em branco e escreva a mesma senha</p>
                </div>
            }
            <div className="form-row">
                <div className="form-group col">
                    <label>
                        Senha
                        {!isAddMode &&
                            (!showPassword
                                ? <span> - <a onClick={() => setShowPassword(!showPassword)} className="text-primary">Mostrar</a></span>
                                : <em> - {user.password}</em>
                            )
                        }
                    </label>
                    <input name="password" type="password" ref={register} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                </div>
                <div className="form-group col">
                    <label>Confirmar Senha</label>
                    <input name="confirmPassword" type="password" ref={register} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Salvar
                </button>
                <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancelar</Link>
            </div>
        </form>
    );
}

export { AddEdit };