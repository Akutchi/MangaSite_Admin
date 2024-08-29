const PROD = false;

const   EXPLORE               =   "manga/explore";
const   LATEST                =   "manga/latest";
const   MANGA_INFO_WITH_ID    =   "manga/info?id=";

const   ALPHABET_SORT         =   "sort/alphabet";

const   GET_PUBLIC            =   "login/getPublic";
const   GET_TIME              =   "login/getTime";
const   VERIFY_USER           =   "login/request_auth";
const   REDIRECT              =   "login/redirect";
const   LOGOUT                =   "login/logout";

const   CHANGE_EXPLORE        =   "admin/changeExplore";
const   CHANGE_MANGA          =   "admin/changeManga";

function getURL() {

    if (PROD) return "https://projetweb.ovh:3080/";

    return "http://localhost:3080/";

}

module.exports = {

    manga: {
        EXPLORE: EXPLORE,
        LATEST: LATEST,
        MANGA_INFO_ID: MANGA_INFO_WITH_ID,
    },
    sort: {
        ALPHABET_SORT: ALPHABET_SORT,
    },
    login: {
        VERIFY_USER: VERIFY_USER,
        GET_PUBLIC: GET_PUBLIC,
        ASK_REDIRECT: REDIRECT,
        LOGOUT: LOGOUT,
        TIME: GET_TIME,
    },
    admin: {
        CHANGE_EXPLORE: CHANGE_EXPLORE,
        CHANGE_MANGA: CHANGE_MANGA,
    },
    getURL: getURL,
}