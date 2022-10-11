import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getToken} from "../../../../hooks/getToken";
import {useApi} from "../../../../hooks/useApi";
import {api} from "../../../../utils/axios";
import {Spinner} from "../../../commons/Spinner/Spinner";
import {EditStudioMain} from "./EditStudioMain";
import {ErrorMessage} from "../../../commons/Messages/ErrorMessage/ErrorMessage";
import {PublisherType, StudioType} from 'types';
import {EditStudioFormType} from "../../../../types/edit-forms.types";

interface Props {
    closeModal: (value: number) => void
    studio:StudioType
}

export const EditStudio = ({closeModal,studio}: Props) => {
    const {id} = useParams();
    const [error, setError] = useState('');
    const token = getToken();
    const navigate = useNavigate();

    const [publishers, loadingPublishers, getPublishersError] = useApi<PublisherType[]>({
        method: 'get',
        url: '/publisher'
    });

    const onSubmit = async (data: EditStudioFormType) => {
        try {
            if (data.image) {
                const newData = {
                    ...data,
                    image: data.image[0]
                }
                const response = await api.patch(`/studio/${id}`, newData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (response.status === 200) {
                    navigate(0)
                } else {
                    setError(response.data.error);
                }
            }
        } catch (e) {
            setError((e as Error).message);
        }
    }

    if (getPublishersError) return <ErrorMessage text={getPublishersError}/>
    return (
        (!publishers || loadingPublishers)
            ? <Spinner/>
            : <EditStudioMain
                onSubmit={onSubmit}
                error={error}
                closeModal={closeModal}
                publishers={publishers}
                studio={studio}
            />
    )
}