import {AddGameFormType, AddPublisherFormType, AddStudioFormType} from "./add-forms.types";

export type EditStudioFormType = Omit<AddStudioFormType, 'name'>;
export type EditPublisherFormType = Omit<AddPublisherFormType, 'name'>;
export type EditGameFormType = Omit<AddGameFormType, 'name'>;