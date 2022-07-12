import React, {FC, useEffect, useState} from 'react';
import EventCalendar from "../components/EventCalendar";
import {Button, Layout, Modal, Row} from "antd";
import EventForm from "../components/EventForm";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypeSelectorDispatch";
import {IEvent} from "../models/IEvent";

const Event: FC = () => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const {getGuests, createEvent, getEvents} = useActions();
    const {guests, events} = useTypedSelector(state => state.event)
    const {user} = useTypedSelector(state => state.auth)

    useEffect(() => {
        getGuests()
        getEvents(user.username)
    }, [])

    const addNewEvent = (event: IEvent) => {
        setIsModalVisible(false)
        createEvent(event, user.username)
    }

    return (
        <Layout>
            <EventCalendar events={events}/>
            <Row justify="center">
                <Button
                    onClick={() => setIsModalVisible(true)}
                >
                    Добавить событие
                </Button>
            </Row>
            <Modal
                title="Basic Modal"
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                <EventForm
                    submit={addNewEvent}
                    guests={guests}
                />
            </Modal>
        </Layout>
    );
};

export default Event;