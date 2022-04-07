function updateUserProfileView () {
    html = `
<div class="avatarImg">
<img src="${model.data.avatars[0].url}" alt="" onclick="selectAvatar(0)"/>
<img src="${model.data.avatars[1].url}" alt="" onclick="selectAvatar(1)"/>
<img src="${model.data.avatars[2].url}" alt="" onclick="selectAvatar(2)"/>
<img src="${model.data.avatars[3].url}" alt="" onclick="selectAvatar(3)"/>
</div>
    `
    return html;
}