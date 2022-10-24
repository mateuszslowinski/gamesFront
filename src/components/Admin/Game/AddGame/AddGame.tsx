import {useState} from "react";
import {api} from "../../../../utils/axios";
import {getToken} from "../../../../hooks/getToken";
import {useApi} from "../../../../hooks/useApi";
import {AddGameMain} from "./AddGameMain";
import {Spinner} from "../../../commons/Spinner/Spinner";
import {ErrorMessage} from "../../../commons/Messages/ErrorMessage/ErrorMessage";
import {StudioType,PlatformType} from 'types';
import {AddGameFormType} from "../../../../types/add-forms.types";

interface Props {
    closeModal: (value: number) => void
}

export const AddGame = ({closeModal}: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [error, setError] = useState('');
    const token = getToken()
    const [studios, loadingStudios, getStudioError] = useApi<StudioType[]>({
        method: 'get',
        url: '/studio'
    });
    const [platforms, loadingPlatforms, getPlatformsError] = useApi<PlatformType[]>({
        method: 'get',
        url: '/platform'
    });

    const onSubmit = async (data: AddGameFormType) => {
        try {
            if (data.image) {
                const newData = {
                    ...data,
                    image: data.image[0]
                }
                const response = await api.post('/game', newData, {
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

    if (getStudioError) return <ErrorMessage text={getStudioError}/>
    if (getPlatformsError) return <ErrorMessage text={getPlatformsError}/>
    return (
        (loadingStudios || !studios || loadingPlatforms || !platforms)
            ? <Spinner/>
            : <AddGameMain
                closeModal={closeModal}
                onSubmit={onSubmit}
                closeConfirmMessage={() => setOpen(false)}
                openConfirmMessage={open}
                error={error}
                studios={studios}
                platforms={platforms}
            />
    )
}