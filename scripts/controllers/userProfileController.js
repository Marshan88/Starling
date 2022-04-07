function selectAvatar(imageId) {
    getUserFromID(model.app.userLoggedInId).avatarId = imageId;
    updateMainView();
}  
