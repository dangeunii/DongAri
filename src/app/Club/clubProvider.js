const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const clubDao = require("./clubDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveClubList = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const clubListResult = await clubDao.selectClub(connection);
    connection.release();

    return clubListResult;
  };

exports.retrieveRecruitClubList = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const recruitClubListResult = await clubDao.selectRecruitClub(connection);
    connection.release();

    return recruitClubListResult;
  };

  // exports.selectclubId = async function () {
  //   const connection = await pool.getConnection(async (conn) => conn);
  //   const selectclubIdResult = await clubDao.selectclubId(connection,clubname);
  //   connection.release();

  //   return selectclubIdResult;
  // };

  //clublike가 있는지 확인
  exports.clublikeCheck = async function (club_id) {
    const connection = await pool.getConnection(async (conn) => conn);
    const clubIdCheckResult = await clubDao.selectclublike(connection, club_id);
    connection.release();
  
    return clubIdCheckResult;
  };

  // 좋아요 누른 동아리 조회
  exports.MyLikeClubList = async function (f_uid) {
    console.log(f_uid);
    const connection = await pool.getConnection(async (conn) => conn);
    const MyLikeClubResult = await clubDao.selectMyLikeClub(connection,f_uid);
    connection.release();

    return MyLikeClubResult[0];
  };

  //
  exports.ClubInfoList = async function (clubid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const clubInfoListResult = await clubDao.selectClubInfo(connection, clubid);
    connection.release();
  
    return clubInfoListResult;
  };
