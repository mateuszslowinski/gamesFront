import {useState} from "react";
import {api} from "../../../../utils/axios";
import {getToken} from "../../../../hooks/getToken";
import {useApi} from "../../../../hooks/useApi";
import {AddStudioMain} from "./AddStudioMain";
import {Spinner} from "../../../commons/Spinner/Spinner";
import {ErrorMessage} from "../../../commons/Messages/ErrorMessage/ErrorMessage";
import {AddStudioFormType} from "../../../../types/add-forms.types";
import {PublisherType} from 'types';

interface Props {
    closeModal: (value: number) => void
}

export const AddStudio = ({closeModal}: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [error, setError] = useState('');
    const token = getToken();
    const [publishers, loading, getPublisherError] = useApi<PublisherType[]>({
        method: 'get',
        url: '/publisher'
    });

    const onSubmit = async (data: AddStudioFormType) => {
        try {
            if (data.image) {
                const newData = {
                    ...data,
                    image: data.image[0]
                }
                const response = await api.post('/studio', newData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (response.status === 201) {
                    setOpen(true);
                } else {
                    setError(response.data.error);
                }
            }
        } catch (e) {
            setError((e as Error).message);
        }
    }

    if (getPublisherError) return <ErrorMessage text={getPublisherError}/>
    return (
        (loading || !publishers)
            ? <Spinner/>
            : <AddStudioMain
            closeModal={closeModal}
            onSubmit={onSubmit}
            closeConfirmMessage={() => setOpen(false)}
            openConfirmMessage={open}
            error={error}
            publishers={publishers}
            />
    )
}
