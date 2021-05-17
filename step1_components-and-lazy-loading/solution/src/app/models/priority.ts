export class Priority {
    id: number;
    text: string;
    value: number;

    constructor(priorityLike: Partial<Priority>) {
        if (priorityLike) {
            Object.assign(this, priorityLike);
        }
    }
}
