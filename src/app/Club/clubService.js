const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const clubProvider = require("./clubProvider");
const clubDao = require("./clubDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

exports.clublike = async function (clubname,f_uid) {
    try {
        // 중복 클릭 확인
        // 한번 -> db에 저장, 두번 -> db에서 드랍 
        //club이름으로 clubid 가져오기
        const connection = await pool.getConnection(async (conn) => conn);
        const selectClubIdParams = clubname;
        console.log(selectClubIdParams)
        const selectclubIdRows = await clubDao.selectclubId(connection,selectClubIdParams);

        if(selectclubIdRows.length <= 0){
            return errResponse(baseResponse.GET_CLUBNAME_WRONG);
        }

        //console.log(selectclubIdRows[0]);
        const clubid = selectclubIdRows
        //console.log(clubid);


        const clublikeRows = await clubProvider.clublikeCheck(clubid,f_uid);
        const ClubLikeParams = [clubid, f_uid];

        if (clublikeRows.length > 0){
            try{
                const deleteClubLikeResult = await clubDao.deleteClubLike(connection, ClubLikeParams);
                console.log(`좋아요 삭제`);
            }catch(err){
                logger.error(`App - deleteClubLike Service error\n: ${err.message}`);
                return errResponse(baseResponse.DB_ERROR);
            }
        }
        
        //
        const clubLikeResult = await clubDao.insertClubLike(connection, ClubLikeParams);
        console.log(`추가된 좋아요 : ${clubLikeResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - insertClubLike Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.ClubInfoList = async function (clubname) {
    try {
        //club이름으로 clubid 가져오기
        const connection = await pool.getConnection(async (conn) => conn);
        const selectClubIdParams = clubname;
        console.log(selectClubIdParams)
        const selectclubIdRows = await clubDao.selectclubId(connection,selectClubIdParams);

        if(selectclubIdRows.length <= 0){
            return errResponse(baseResponse.GET_CLUBNAME_WRONG);
        }

        //console.log(selectclubIdRows[0]);
        const clubid = selectclubIdRows
        console.log(clubid);

        const ClubInfoListRows = await clubProvider.ClubInfoList(clubid);
        return ClubInfoListRows[0];


    } catch (err) {
        logger.error(`App - insertClubLike Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

