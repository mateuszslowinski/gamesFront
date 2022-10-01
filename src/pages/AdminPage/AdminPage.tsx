import {useState} from 'react';
import {AddGame} from "../../components/Admin/AddGame/AddGame";
import {AddPublisher} from "../../components/Admin/AddPublisher/AddPublisher";
import {AddStudio} from "../../components/Admin/AddStudio/AddStudio";
import {AddPlatform} from "../../components/Admin/AddPlatfrom/AddPlatform";
import {Button} from "../../components/commons/Button/Button";

import './AdminPage.css';

export const AdminPage = () => {
    const [adminFeatureOpen, setAdminFeatureOpen] = useState<number>(0)
    const handleToggleFeature = (featureNumber: number) => {
        if (adminFeatureOpen === featureNumber) {
            setAdminFeatureOpen(0)
        } else {
            setAdminFeatureOpen(featureNumber)
        }
    }

    return (
        <div className='admin__container'>
            <h3>Panel Admina</h3>
            <div className='admin__buttons__container'>
                <Button onClick={() => handleToggleFeature(1)} text='Dodaj nową grę'/>
                <Button onClick={() => handleToggleFeature(2)}  text="Dodaj nowego wydawcę"/>
                <Button onClick={() => handleToggleFeature(3)} text='Dodaj nowe studio'/>
                <Button onClick={() => handleToggleFeature(4)}  text="Dodaj nową platformę"/>
            </div>
            {adminFeatureOpen === 1 && <AddGame closeModal={setAdminFeatureOpen}/>}
            {adminFeatureOpen === 2 && <AddPublisher closeModal={setAdminFeatureOpen}/>}
            {adminFeatureOpen === 3 && <AddStudio closeModal={setAdminFeatureOpen}/>}
            {adminFeatureOpen === 4 && <AddPlatform closeModal={setAdminFeatureOpen}/>}
        </div>
    )
}