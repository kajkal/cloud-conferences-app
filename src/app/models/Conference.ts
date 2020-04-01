export interface ConferenceComment {

    timestamp: string;

    author: string;

    content: string;

}

export interface ConferenceRating {

    value: number;

    votes: string[];

}

export interface Conference {

    key: string;

    name: string;

    country: string;

    startDate: string;

    endDate: string;

    price: number;

    freePlaces: number;

    description: string;

    thumbnailUrl: string;

    rating: ConferenceRating;

    comments?: ConferenceComment[];

}

export type NewConference = Omit<Conference, 'key'>;

export interface SelectedConference extends Conference {
    selectedPlacesCount: number;
}
