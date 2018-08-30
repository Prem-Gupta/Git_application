 interface gitAuthVariable {
    CLIENT_ID: string;
    CLIENT_DOMAIN: string;
    AUDIENCE: string;
    REDIRECT: string;
    SCOPE: string;
}

export const auth : gitAuthVariable = {

    CLIENT_ID: 'hhuQ1cr93x7Pp6tFhfQhI2XWxgBgiAmH',
    CLIENT_DOMAIN: 'priyam.auth0.com',
    AUDIENCE: 'https://priyam.auth0.com/userinfo',
    REDIRECT: 'http://localhost:4201/profile',
    SCOPE: 'openid profile'
}
