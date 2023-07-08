module.exports = function(app){
    const club = require('./clubController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 동아리 목록 조회 API
    app.get('/app/clubs', club.getClubs);

    // 2. 모집 중인 동아리 목록 조회 API
    app.get('/app/clubs/recruit', club.getRecruitClubs);

    // 3. 클럽 좋아요 누르기 API
    app.post('/app/clubs/like',club.postClubsLike);
    
    // 4. 유저 좋아요 누른 클럽 목록 API
    app.get('/app/clubs/like',club.getMyLikeClubs);

    // 5. 개별 동아리 페이지 조회 API
    app.get('/app/clubs/info', club.getClubsInfo);




};

