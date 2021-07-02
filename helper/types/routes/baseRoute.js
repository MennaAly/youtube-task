export class BaseRoute {
    mediaId;
    type;
    constructor() {
        if (this.constructor == 'BaseRoute') {
            throw new Error(" Object of Abstract Class cannot be created");
        }
    }

    getNavigetionDestination() {
        throw new Error("Abstract Method has no implementation");

    }

}