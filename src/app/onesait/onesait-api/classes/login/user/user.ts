import { Profile } from '../profiles/profile';

export class User {

    lastConnectionDate: string;
    lastConnectionIP: string;
    userLegalId: string;
    userSecondaryLegalId: string;
    userSecondaryLegalIdType: string;
    userNumber: string;
    userName: string;
    userFirstSurname: string;
    userSecondSurname: string;
    userLanguage: string;
    sessionTimeout: number;
    updateCredentialRequired: boolean;
    pushNotificationActivated: boolean;
    userWarning: string;
    userCodeWarning: string;
    aditionalInfo: AditionalInfo;
    activeProfile: string;
    profiles: Profile[];
    activeProfileObj: Profile;

    constructor(lastConnectionDate: string,
        lastConnectionIP: string,
        userLegalId: string,
        userSecondaryLegalId: string,
        userSecondaryLegalIdType: string,
        userNumber: string,
        userName: string,
        userFirstSurname: string,
        userSecondSurname: string,
        userLanguage: string,
        sessionTimeout: number,
        updateCredentialRequired: boolean,
        pushNotificationActivated: boolean,
        userWarning: string,
        userCodeWarning: string,
        aditionalInfo: AditionalInfo,
        profiles?: Profile[],
        activeProfileObj?: Profile) {

        this.lastConnectionDate = lastConnectionDate;
        this.lastConnectionIP = lastConnectionIP;
        this.userLegalId = userLegalId;
        this.userSecondaryLegalId = userSecondaryLegalId;
        this.userSecondaryLegalIdType = userSecondaryLegalIdType;
        this.userNumber = userNumber;
        this.userName = userName;
        this.userFirstSurname = userFirstSurname;
        this.userSecondSurname = userSecondSurname;
        this.userLanguage = userLanguage;
        this.sessionTimeout = sessionTimeout;
        this.updateCredentialRequired = updateCredentialRequired;
        this.pushNotificationActivated = pushNotificationActivated;
        this.userWarning = userWarning;
        this.userCodeWarning = userCodeWarning;
        this.aditionalInfo = aditionalInfo;
        this.profiles = profiles;
        this.activeProfileObj = activeProfileObj;

    }

    public static createUserfromAny(data: any) {
        return new User(data.lastConnectionDate,
            data.lastConnectionIP,
            data.userLegalId,
            data.userSecondaryLegalId,
            data.userSecondaryLegalIdType,
            data.userNumber,
            data.userName,
            data.userFirstSurname,
            data.userSecondSurname,
            data.userLanguage,
            data.sessionTimeout,
            data.updateCredentialRequired,
            data.pushNotificationActivated,
            data.userWarning,
            data.userCodeWarning,
            data.aditionalInfo,
            Profile.createProfilefromAnyArray(data.profiles));
    }


}

export interface AditionalInfo {
    campaignCode: string;
    myAdvisor: string;
    personalCard: string;
}
