export class BookingList {
    static get emptyBookingList(): BookingList {
        return new BookingList();
    }

    conferences: Map<string, number>; // conference id => reserved places

    private constructor(
        conferences: Map<string, number> = new Map<string, number>()
    ) {
        this.conferences = conferences;
    }

    static fromJSON(json: string): BookingList {
        const parsed = JSON.parse(json);
        return new BookingList(new Map<string, number>(parsed.conferences));
    }

    toJSON(): string {
        return JSON.stringify({
            conferences: Array.from(this.conferences.entries())
        });
    }
}
