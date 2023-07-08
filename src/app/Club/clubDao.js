// 모든 동아리 조회
async function selectClub(connection) {
    const selectClubListQuery = `
    select clubname,clubinfo,clubday,clubnum,clubimg,clubstatus,clubtag,clubdday,clublike from club where clubstatus = 1 or  clubstatus = 2;
                  `;
    const [clubRows] = await connection.query(selectClubListQuery);
    return clubRows;
  }

module.exports = {
    selectClub,
};

// 모집 중인 동아리 조회
async function selectRecruitClub(connection) {
  const retrieveRecruitClubQuery = `
  select clubname,clubinfo,clubday,clubnum,clubimg,clubstatus from club where clubstatus = 1;
                `;
  const [clubRows] = await connection.query(retrieveRecruitClubQuery);
  return clubRows;
}


// // 좋아요 반환 -> 좋아요 수 수정
// async function updateClubLike(connection,clubid,num) {
//   const updateClubLikeQuery = `
//   UPDATE club 
//   SET clublike = ?
//   WHERE clubid = ?;`;
//   const updateClubLikeRow = await connection.query(updateClubLikeQuery, [clubid, num]);
//   return updateClubLikeRow[0];
// }

// 좋아요 취소-> clublike db에서 열 제거
async function deleteClubLike(connection,ClubLikeParams) {
  const deleteClubLikeQuery = `
  delete from clublike where club_id = ? and user_id = ?;`;
  const deleteClubLikeRow = await connection.query(
    deleteClubLikeQuery,
    ClubLikeParams
);
  return deleteClubLikeRow[0];
}

// 좋아요 생성
async function insertClubLike(connection, ClubLikeParams) {
  const insertClubLikeQuery = `
  INSERT INTO clublike (club_id, user_id)  VALUES (?, ?);
    `;
  const insertClubLikeRow = await connection.query(
    insertClubLikeQuery,
    ClubLikeParams
  );

  return insertClubLikeRow;
}

// // 클럽 이름으로 클럽 아이디 조회
// async function selectclubId(connection, selectClubIdParams) {
//   const selectclubIdQuery = `
//     SELECT clubid 
//     FROM club 
//     WHERE clubname = ?;
//   `;
//   const selectclubIdRow = await connection.query(
//     selectclubIdQuery,
//     selectClubIdParams
//   );
//   console.log(selectclubIdRow);
//   return selectclubIdRow[0]; // Corrected typo in variable name
// }

// 클럽 id 조회
async function selectclubId(connection, clubname) {
  const selectclubIdQuery = `
    SELECT clubid 
    FROM club 
    WHERE clubname = ?;
  `;
  const [selectclubIdRow] = await connection.query(selectclubIdQuery, [clubname]);
  return selectclubIdRow[0].clubid;
}

// 클럽 이름으로 클럽 아이디 조회
async function selectclublike(connection,club_id) {
  const selectclublikeQuery = `
                SELECT like_id 
                FROM clublike 
                WHERE club_id = ?;
                `;
  const selectclublikeRows = await connection.query(selectclublikeQuery,club_id);
  return selectclublikeRows;
}

// 좋아요 누른 동아리 목록 조회
async function selectMyLikeClub(connection,f_uid) {
  const selectclublikeQuery = `
                SELECT club_id 
                FROM clublike 
                WHERE user_id = ?;
                `;
  const [selectclublikeRows] = await connection.query(selectclublikeQuery,[f_uid]);
  console.log(f_uid)
  return selectclublikeRows;
}

// 개별 클럽 조회
async function selectClubInfo(connection,clubid) {
  const selectClubInfoQuery = `
                SELECT clubname,clubinfo,clubday,clubnum,clubimg,clubstatus,clubtag,clubdday,clublike
                FROM club 
                WHERE clubid = ?;
                `;
  const selectClubInfoRows = await connection.query(selectClubInfoQuery,clubid);
  return selectClubInfoRows;
}

module.exports = {
  selectClub,
  selectRecruitClub,
  deleteClubLike,
  insertClubLike,
  selectclubId,
  selectclublike,
  selectMyLikeClub,
  selectClubInfo,

};