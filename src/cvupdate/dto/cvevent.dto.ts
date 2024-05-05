
import { Cv } from "src/cv/entities/cv.entity";
import { CvupdateType } from "src/enums/cv-events.enum";
import { User } from "src/auth/entities/user.entity";

export class CvEventDto {
    constructor(
        public type: CvupdateType,
        public cv: Cv,
        public performedBy: User
    ) {}
}