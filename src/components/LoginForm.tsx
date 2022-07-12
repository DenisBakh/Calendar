import React, {FC, useState} from 'react';
import {Button, Form, Input} from "antd";
import {rules} from "../utils/rules";
import {AuthActionCreators} from "../store/reducers/auth/action-creators";
import {useAppDispatch, useTypedSelector} from "../hooks/useTypeSelectorDispatch";
import {useActions} from "../hooks/useActions";

const LoginForm: FC = () => {
    const {login} = useActions()
    const {isLoading, error} = useTypedSelector(state => state.auth)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = () => {
        login(username, password)
    }

    return (
        <Form
            style={{width:'500px'}}
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 12 }}
            onFinish={onSubmit}
        >
            {error ? (
                <div style={{color: 'red'}}>{error}</div>
            ): null}

            <Form.Item
                label="Имя пользователя"
                name="username"
                rules={[rules.required('Введите имя пользователя!')]}
            >
                <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Item>

            <Form.Item
                label="Пароль"
                name="password"
                rules={[rules.required('Введите пароль!')]}
            >
                <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 12, span: 16 }} style={{margin: 0}}>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                >
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;