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

    city: string; //country

    startDate: string;

    organizer: string; //new

    category: string; //new

    endDate: string;

    price: number;

    slots: number;

    detailUrl: string;

    contact: string;

    comments?: ConferenceComment[];
}

export type NewConference = Omit<Conference, "key">;

export interface SelectedConference extends Conference {
    selectedPlacesCount: number;
}
