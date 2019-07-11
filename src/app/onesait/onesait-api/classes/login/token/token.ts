export class Token {

    access_token: string;
    token_type: string;
    scope: string;
    jti: string;
    expires_in: number;
    refresh_token: string;

     constructor(access_token: string,
                 token_type: string,
                 scope: string,
                 jti: string,
                 expires_in: number,
                 refresh_token: string ) {
         this.access_token  = access_token;
         this.token_type    = token_type;
         this.scope         = scope;
         this.jti           = jti;
         this.expires_in    = expires_in;
         this.refresh_token = refresh_token;
        }

    public static createTokenfromAny( data: any) {
            return new Token( data.access_token, data.token_type, data.scope, data.jti, data.expires_in, data.refresh_token);
    }

 }
