import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {api} from "../../../../utils/axios";
import {EditPublisherMain} from "./EditPublisherMain";
import {EditPublisherFormType} from "../../../../types/edit-forms.types";
import {PublisherType} from 'types';

interface Props {
    closeModal: (value: number) => void
    publisher: PublisherType
    token: string | null
}

export const EditPublisher = ({closeModal, publisher, token}: Props) => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const onSubmit = async (data: EditPublisherFormType) => {
        try {
            const response = await api.patch(`/publisher/${publisher.name}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                navigate(0)
            } else {
                setError(response.data.error);
            }
        } catch (e) {
            setError((e as Error).message);
        }
    }

    return (
        <EditPublisherMain
            onSubmit={onSubmit}
            error={error}
            closeModal={closeModal}
            publisher={publisher}
        />
    )
}