const jwtMiddleware = require("../../../config/jwtMiddleware");
const clubProvider = require("../../app/Club/clubProvider");
const clubService = require("../../app/Club/clubService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 1
 * API Name : 동아리 전체 목록 조회 API
 * [GET] /app/clubs
 */
exports.getClubs = async function (req, res) {

    // 동아리 전체 조회
    const clubListResult = await clubProvider.retrieveClubList();
    return res.send(response(baseResponse.SUCCESS, clubListResult));
};

/**
 * API No. 2
 * API Name : 모집 중인 동아리 목록 조회 API
 * [GET] /app/clubs/recruit
 */
exports.getRecruitClubs = async function (req, res) {

    // 동아리 전체 조회
    const recruitClubListResult = await clubProvider.retrieveRecruitClubList();
    return res.send(response(baseResponse.SUCCESS, recruitClubListResult));
};

/**
 * API No. 3
 * API Name : 클럽 좋아요 누르기 API
 * [POST] /app/clubs/like
 */
exports.postClubsLike = async function (req, res) {

    /**
     * Body: clubname, f_uid
     */
    const {clubname, f_uid} = req.body;
    

    //빈 값 체크
    if (!f_uid)
        return res.send(response(baseResponse.SIGNUP_UID_EMPTY));
    
    //빈 값 체크
    if (!clubname)
        return res.send(response(baseResponse.CLUB_ClLUBNAME_EMPTY));


    const clubLikeResponse = await clubService.clublike(
        clubname,
        f_uid
    );

    return res.send(clubLikeResponse);
};

/**
 * API No. 4
 * API Name : 좋아요 누른 동아리 목록 조회 API
 * [GET] /app/clubs/like
 */
exports.getMyLikeClubs = async function (req, res) {

    const f_uid = req.query.f_uid;
    console.log(f_uid);

    // 동아리 전체 조회
    const MyLikeClubsResult = await clubProvider.MyLikeClubList(f_uid);
    return res.send(response(baseResponse.SUCCESS, MyLikeClubsResult));
};

/**
 * API No. 5
 * API Name : 개별 동아리 조회 API
 * [GET] /app/clubs/info
 */
exports.getClubsInfo = async function (req, res) {

    const clubname = req.query.clubname;
    //console.log(f_uid);


    // 동아리 전체 조회
    const ClubInfoResult = await clubService.ClubInfoList(clubname);
    return res.send(response(baseResponse.SUCCESS, ClubInfoResult));
};
