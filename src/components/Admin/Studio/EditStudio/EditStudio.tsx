import {useState} from "react";
import {useParams} from "react-router-dom";
import {getToken} from "../../../../hooks/getToken";
import {useApi} from "../../../../hooks/useApi";
import {api} from "../../../../utils/axios";
import {Spinner} from "../../../commons/Spinner/Spinner";
import {EditStudioMain} from "./EditStudioMain";
import {ErrorMessage} from "../../../commons/Messages/ErrorMessage/ErrorMessage";
import {PublisherType, StudioType} from 'types';
import {AddStudioFormType} from "../../../../types/add-forms.types";

interface Props {
    closeModal: (value: number) => void
}

export const EditStudio = ({closeModal}: Props) => {
    const {id} = useParams();
    const [open, setOpen] = useState<boolean>(false);
    const [error, setError] = useState('');
    const token = getToken();
    const [publishers, loadingPublishers, getPublishersError] = useApi<PublisherType[]>({
        method: 'get',
        url: '/publisher'
    });
    const [studio, loadingStudio, errorStudio] = useApi<StudioType>({
        method: 'get',
        url: `/studio/${id}`
    }, id);


    const onSubmit = async (data: AddStudioFormType) => {
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
                    setOpen(true);
                } else {
                    setError(response.data.error);
                }
            }
        } catch (e) {
            setError((e as Error).message);
        }
    }


    if (errorStudio) return <ErrorMessage text={errorStudio}/>
    if (getPublishersError) return <ErrorMessage text={getPublishersError}/>
    return (
        <>
            {(!publishers || !studio || loadingStudio || loadingPublishers)
                ? <Spinner/>
                : <EditStudioMain
                    onSubmit={onSubmit}
                    openConfirmMessage={open}
                    closeConfirmMessage={() => setOpen(false)}
                    error={error}
                    closeModal={closeModal}
                    publishers={publishers}
                    studio={studio}
                />
            }
        </>
    )
}