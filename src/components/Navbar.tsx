import React, {FC} from 'react';
import {Layout, Menu, Row} from "antd";
import { useNavigate } from "react-router-dom";
import {RouteNames} from "../routes";
import {useTypedSelector} from "../hooks/useTypeSelectorDispatch";
import {useActions} from "../hooks/useActions";

const Navbar: FC = () => {
    const navigate = useNavigate();
    const {logOut} = useActions()
    const {isAuth, user} = useTypedSelector(state => state.auth )

    return (
        <Layout.Header>
            <Row justify="end">
                {isAuth
                    ?
                    <>
                        <div style={{color: 'white'}}>{user.username}</div>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            selectable={false}
                            disabledOverflow
                        >
                            <Menu.Item
                                onClick={logOut}
                                key={1}
                            >
                                Выйти
                            </Menu.Item>
                        </Menu>
                    </>

                    :
                    <>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            selectable={false}
                            disabledOverflow
                        >
                            <Menu.Item
                                onClick={() => navigate(RouteNames.LOGIN)}
                                key={1}
                            >
                                Логин
                            </Menu.Item>
                        </Menu>
                    </>

                }

            </Row>
        </Layout.Header>
    );
};

export default Navbar;