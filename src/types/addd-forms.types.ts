export type AddPublisherFormType = {
    name: string
    description: string
}

export type AddPlatformFormType = AddPublisherFormType;

export interface AddStudioFormType extends AddPublisherFormType {
    ownerId: string
    country: string
    founded: string
    employees: number
    image: FileList | null
}
