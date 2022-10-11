import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useApi} from "../../../../hooks/useApi";
import {api} from "../../../../utils/axios";
import {EditGameMain} from "./EditGameMain";
import {Spinner} from "../../../commons/Spinner/Spinner";
import {ErrorMessage} from "../../../commons/Messages/ErrorMessage/ErrorMessage";
import {EditGameFormType} from "../../../../types/edit-forms.types";
import {StudioType, GameType} from 'types';

interface Props {
    closeModal: () => void
    game: GameType
    token: string | null
}

export const EditGame = ({closeModal, game, token}: Props) => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [studios, loading, gameError] = useApi<StudioType[]>({
        method: 'get',
        url: '/studio'
    });


    const onSubmit = async (data: EditGameFormType) => {
        try {
            if (data.image) {
                const newData = {
                    ...data,
                    image: data.image[0]
                }
                const response = await api.patch(`/game/${game.id}`, newData, {
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

    if (gameError) return <ErrorMessage text={gameError}/>
    return (
        (loading || !studios)
            ? <Spinner/>
            : <EditGameMain
                onSubmit={onSubmit}
                closeModal={closeModal}
                studios={studios}
                game={game}
                error={error}
            />
    )
}