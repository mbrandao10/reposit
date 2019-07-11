export class Group {
    id: string;
    name: string;
    href: string;

    constructor(id: string,
        name: string,
        href: string) {

        this.id = id;
        this.name = name;
        this.href = href;

    }

    public static createGroup(data: any) {
        return new Group(data.id, data.name, data.href);
    }
}

export class RelationShip {
    id: string;
    name: string;
    href: string;

    constructor(id: string,
        name: string,
        href: string) {

        this.id = id;
        this.name = name;
        this.href = href;

    }

    public static createRelationShip(data: any) {
        return new RelationShip(data.id, data.name, data.href);
    }
}



export class Profile {
    id: string;
    holderLegalId: string;
    contractNumber: string;
    contractName: string;
    userNumber: number;
    group: Group;
    relationShip: RelationShip;

    constructor(id: string,
        holderLegalId: string,
        contractNumber: string,
        contractName: string,
        userNumber: number,
        group: Group,
        relationShip: RelationShip, ) {

        this.id = id;
        this.holderLegalId = holderLegalId;
        this.contractNumber = contractNumber;
        this.contractName = contractName;
        this.userNumber = userNumber;
        this.group = group;
        this.relationShip = relationShip;
    }

    public static createProfilefromAny(data: any) {
        return new Profile(data.id, data.holderLegalId, data.contractNumber,
            data.contractName, data.userNumber, Group.createGroup(data.group),
            RelationShip.createRelationShip(data.relationShip));
    }

    public static createProfilefromAnyArray(data: any[]) {
        let profiles: Profile[] = [];
        if (data) {
            data.forEach(reg => {
                profiles.push(Profile.createProfilefromAny(reg));
            }
            );
        }
        return profiles;

    }

}


